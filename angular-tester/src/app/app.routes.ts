import { Routes } from '@angular/router';
import { LearningModeViewComponent } from './views/learning-mode-view/learning-mode-view.component';
import { MainViewComponent } from './views/main-view/main-view.component';
import { AllQestionsViewComponent } from './views/all-qestions-view/all-qestions-view.component';
import { PageNotFoundViewComponent } from './views/page-not-found-view/page-not-found-view.component';

export const routes: Routes = [
    { path: '', component: MainViewComponent },
    { path: 'tests', component: MainViewComponent },
    { path: 'tests/:filename', component: AllQestionsViewComponent },
    { path: 'learning/:filename', component: LearningModeViewComponent },
    { path: '**', component: PageNotFoundViewComponent }
];
