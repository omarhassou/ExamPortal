import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcommeComponent } from './pages/admin/welcomme/welcomme.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { LeadQuizComponent } from './pages/user/lead-quiz/lead-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartComponent } from './pages/user/start/start.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },
  {
    path:'signup', 
    component:SignupComponent,
    pathMatch:'full',
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'prefix'
  },
  {
    path:'admin',
    component :DashboardComponent,
    canActivate:[AdminGuard],
    children:[{
      path:'',
      component:WelcommeComponent
    },
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:"categories",
        component:ViewCategoriesComponent
      },
      {
        path:"add-category",
        component:AddCategoryComponent
      },
      {
        path:"quizzes"
        ,component:ViewQuizzesComponent
      },
      {
        path:"add-quiz",
        component:AddQuizComponent
      },
      {
        path:'quiz/:qid',
        component:UpdateQuizComponent
      },
      {
        path:'view-questions/:qid/:title',
        component : ViewQuizQuestionsComponent
      },
      {
        path:'add-question/:qid/:titre',
        component:AddQuestionComponent
      },
     
    ]
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    canActivate:[NormalGuard],
    children:[
      {
        path:':catId',
        component :LeadQuizComponent
      },
      {
        path:'instructions/:qid',
        component: InstructionsComponent
      },
     
    ]
  },
  {
    path:'start/:qid',
    component: StartComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
