import { Injectable } from '@angular/core';
import { Question } from '../models/questions';
import { waitForAsync } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class QuestionSetService {
  private db?: IDBDatabase;

  constructor() {
    this.initializeDatabase();
  }
  
  private initializeDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('QuestionSetsDatabase', 1);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = request.result;
        if (!db.objectStoreNames.contains('questionSets')) {
          let store = db.createObjectStore('questionSets', { keyPath: 'id', autoIncrement: true });
          store.createIndex("nameIndex", "name", { unique: false });
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

  saveFileToIndexedDB(questionSetName: string, content: string): void {
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
    };

    request.onerror = (event) => {
      console.error('Błąd podczas zapisywania pliku:', request.error);
    };
  }
  getAllQuestionSets(): void {
    if (!this.db) return;
  
    const transaction = this.db.transaction('questionSets', 'readonly');
    const store = transaction.objectStore('questionSets');
  
    const request = store.getAll();
  
    request.onsuccess = () => {
      console.log('Zapisane pliki:', request.result);
    };
  
    request.onerror = (event) => {
      console.error('Błąd odczytu plików:', request.error);
    };
  }
  getQuestionSet(name: string): Promise<Question[]> {
    //todo
    return new Promise(async (resolve, reject) => {
      if (!this.db) 
        await this.initializeDatabase();

      const transaction = this.db!.transaction('questionSets', 'readonly');
      const store = transaction.objectStore('questionSets');
      const index = store.index('nameIndex');
      const request = index.get(name+".json");
    
      request.onsuccess = () => {
        if (request.result) {
          const content: string = request.result.content;
          resolve(Question.quetionsFromJson(content));
        } else {
          resolve([]);
        }
      };
      request.onerror = () => {
        resolve([]);
      };
    });
  }
}

