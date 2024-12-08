import { Routes } from '@angular/router';
import { LearningModeViewComponent } from './views/learning-mode-view/learning-mode-view.component';
import { MainViewComponent } from './views/main-view/main-view.component';

export const routes: Routes = [
    { path: '', component: MainViewComponent },
    { path: 'tests', component: MainViewComponent },
    { path: 'tests/:filename', component: LearningModeViewComponent },
];
