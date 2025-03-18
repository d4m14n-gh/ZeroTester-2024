import { Injectable } from '@angular/core';
import { Question } from '../models/questions';
import { waitForAsync } from '@angular/core/testing';
import * as yaml from 'js-yaml';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionSetService {
  private db?: IDBDatabase;
  private questionSetUpdateSubject = new Subject<void>();
  public questionSetUpdate$: Observable<void> = this.questionSetUpdateSubject.asObservable();
  
  constructor(private http: HttpClient) {
    
    this.initializeDatabase(true);
  }
  
  private extractFile(content: string): Question[] {
    let sp = "aui.yml".split('.');
    if (sp[sp.length-1]=="yml"){
      content = JSON.stringify(yaml.load(content as string), null, 2);
    }
    return Question.quetionsFromJson(content as string);
  }

  private triggerQuestionSetUpdate(): void{
    this.questionSetUpdateSubject.next();
  }
  
  private initializeDatabase(addExampleSet: boolean=false): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('QuestionSetsDatabase', 1);
      
      let createTable = false;

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = request.result;
        if (!db.objectStoreNames.contains('questionSets')){
          db.createObjectStore('questionSets', { keyPath: 'name'});
          createTable = true;
        }
        this.db = request.result;
        if(addExampleSet&&createTable){
          this.http.get('assets/tests/aui-1.json', { responseType: 'text' })
          .subscribe(data => {
              let content = data;
              if (content){
                let questions = this.extractFile(content as string);
                this.saveFileToIndexedDB("example", questions);
              }
            }, error => {
              console.error('Error:', error);
            });
        }
        resolve();
      };

      request.onsuccess = () => {
        this.db = request.result; 
        resolve();
      };

      request.onerror = (event) => {
        console.error('Błąd otwierania bazy danych:', request.error);
        reject();
      };

      
    });
  }

  async saveFileToIndexedDB(questionSetName: string, content: Question[]): Promise<void> {
    if (!this.db) await this.initializeDatabase();

    const transaction = this.db!.transaction('questionSets', 'readwrite');
    const store = transaction.objectStore('questionSets');
    const questionSetRecord = {
      name: questionSetName,
      content: content,
      timestamp: new Date(),
    };
    const request = store.add(questionSetRecord);
    
    request.onsuccess = () => this.triggerQuestionSetUpdate();
    request.onerror = () => console.error('Błąd podczas zapisywania pytan:', request.error);
  }
  getQuestionSet(name: string): Promise<Question[]> {
    return new Promise(async (resolve, reject) => {
      if (!this.db) await this.initializeDatabase();

      const transaction = this.db!.transaction('questionSets', 'readonly');
      const store = transaction.objectStore('questionSets');
      const request = store.get(name);
    
      request.onsuccess = () => resolve(request.result.content);
      request.onerror = () => reject();
    });
  }
  deleteQuestionSet(name: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!this.db) await this.initializeDatabase();

      const transaction = this.db!.transaction('questionSets', 'readwrite');
      const store = transaction.objectStore('questionSets');
      const request = store.delete(name);
    
      request.onsuccess = () => {
        resolve();
        this.triggerQuestionSetUpdate();
      }
      request.onerror = () => reject();
    });
  }
  getAllQuestionSetNames(): Promise<string[]> {
    return new Promise(async (resolve) => {
      if (!this.db) await this.initializeDatabase();
    
      const transaction = this.db!.transaction('questionSets', 'readonly');
      const store = transaction.objectStore('questionSets');
      const request = store.getAll();
    
      request.onsuccess = () => resolve(request.result.map(res => res.name));
      request.onerror = (event) => resolve([]);
    });
  }
}

