import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {path:'', redirectTo: '/dashboard', pathMatch:'full'},
  { path: 'login', component: LoginComponent },    
  {path:'**', component: NopageFoundComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule

],
  exports: [RouterModule]
})
export class AppRoutingModule { }
