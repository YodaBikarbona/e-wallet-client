import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {DashboardComponent, DashboardGuard} from './dashboard/dashboard.component';
import { BillsComponent } from './bills/bills.component';
import { ProfileComponent } from './profile/profile.component';
import { UserResolver } from './services/user.resolver';
import { RegisterComponent } from './register/register.component';
import {RestartPasswordComponent} from './restart-password/restart-password.component';
import {CityResolver, CountryResolver} from './services/country.service';
import {SettingsComponent} from './settings/settings.component';
import {GraphComponent} from './graph/graph.component';
import {NewsComponent} from './news/news.component';
import {ApplicationComponent} from './application/application.component';
import {BugsComponent} from './bugs/bugs.component';
import {SuggestionsComponent} from './suggestions/suggestions.component';

const routes: Routes = [
  {
  path: 'login', component: LoginComponent
},
{
  path: 'register', component: RegisterComponent, resolve: {countries: CountryResolver}
},
{
  path: 'restartPassword', component: RestartPasswordComponent
},
{
  path: 'dashboard', component: DashboardComponent, canActivate: [DashboardGuard],
  children: [
    {path: '', component: NewsComponent},
    {path: 'profile', component: ProfileComponent, resolve: {user: UserResolver, countries: CountryResolver}},
    {path: 'bills', component: BillsComponent,
      /*children: [
        {path: "profits", component: BillsComponent},
        {path: "costs", component: BillsComponent}
        ]*/
    },
    //{path: "profits", component: BillsComponent},
    //{path: "costs", component: BillsComponent},
    {path: 'graph', component: GraphComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'application', component: ApplicationComponent,
    children: [
      {path: 'bugs', component: BugsComponent},
      {path: 'suggestions', component: SuggestionsComponent}
    ]},
  ]
},
{path: '**', redirectTo: '/login', pathMatch: 'full'}
];

// path: "dashboard/:id", component: DashboardComponent, //children: {profile} za bindanje id-a u rutu

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
