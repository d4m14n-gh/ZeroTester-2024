import { Injectable } from '@angular/core';
import { Question } from '../models/questions';
import { waitForAsync } from '@angular/core/testing';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionSetService {
  private db?: IDBDatabase;
  private questionSetUpdateSubject = new Subject<void>();
  public questionSetUpdate$: Observable<void> = this.questionSetUpdateSubject.asObservable();
  
  constructor() {
    this.initializeDatabase();
  }
  
  private triggerQuestionSetUpdate(): void{
    this.questionSetUpdateSubject.next();
  }
  
  private initializeDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('QuestionSetsDatabase', 1);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = request.result;
        if (!db.objectStoreNames.contains('questionSets')) {
          let store = db.createObjectStore('questionSets', { keyPath: 'name'});
          //store.createIndex("nameIndex", "name", { unique: true });
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

  saveFileToIndexedDB(questionSetName: string, content: Question[]): void {
    if (!this.db) return;

    const transaction = this.db.transaction('questionSets', 'readwrite');
    const store = transaction.objectStore('questionSets');

    const questionSetRecord = {
      name: questionSetName,
      content: content,
      timestamp: new Date(),
    };

    const request = store.add(questionSetRecord);
    request.onsuccess = () => {
      console.log(`Plik "${questionSetName}" został zapisany w IndexedDB.`);
      this.triggerQuestionSetUpdate();
    };

    request.onerror = (event) => {
      console.error('Błąd podczas zapisywania pliku:', request.error);
    };
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
      if (!this.db) 
        await this.initializeDatabase();
    
      const transaction = this.db!.transaction('questionSets', 'readonly');
      const store = transaction.objectStore('questionSets');
      const request = store.getAll();
    
      request.onsuccess = () => resolve(request.result.map(res => res.name));
      request.onerror = (event) => resolve([]);
    });
  }
}

