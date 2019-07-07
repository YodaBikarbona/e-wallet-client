import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BillsComponent } from './bills/bills.component';
import { ProfileComponent } from './profile/profile.component';
import { UserResolver } from './services/user.resolver';
import { RegisterComponent } from './register/register.component';
import {RestartPasswordComponent} from './restart-password/restart-password.component';
import {CountryResolver} from './services/country.service';
import {SettingsComponent} from './settings/settings.component';

const routes: Routes = [
  {
  path: "login", component: LoginComponent
},
{
  path: "register", component: RegisterComponent, resolve: {countries: CountryResolver}
},
{
  path: "restartPassword", component: RestartPasswordComponent
},
{
  path: "dashboard", component: DashboardComponent,
  children: [
    {path: "profile", component: ProfileComponent, resolve: {user: UserResolver}},
    {path: "bills", component: BillsComponent,
      /*children: [
        {path: "profits", component: BillsComponent},
        {path: "costs", component: BillsComponent}
        ]*/
    },
    //{path: "profits", component: BillsComponent},
    //{path: "costs", component: BillsComponent},
    {path: "settings", component: SettingsComponent},
  ]
},
{path: "**", redirectTo: "/dashboard", pathMatch: "full"}
];

// path: "dashboard/:id", component: DashboardComponent, //children: {profile} za bindanje id-a u rutu

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
