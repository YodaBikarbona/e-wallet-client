import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login/login.component';

// Import angular material
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatSidenavModule, MatListModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material";
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';












//import { VERSION } from '@angular/material';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
import { NavService } from './dashboard/nav.service';
import { BillsComponent } from './bills/bills.component';
import { ProfileComponent } from './profile/profile.component';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWTHeaderInterceptor } from './services/authorization-header.interceptor';
import { RegisterComponent } from './register/register.component';
import { RestartPasswordComponent } from './restart-password/restart-password.component';
import { SettingsComponent } from './settings/settings.component';
import { DialogChangePasswordComponent} from './profile/change_password';
import {DialogEditProfileComponent} from './profile/edit_profile';
import {ChartsModule} from 'ng2-charts';
import { GraphComponent } from './graph/graph.component';
import { DialogNewBillComponent } from './bills/new-bill.component';
import { DialogShowBillComponent } from './bills/show-bill.component';
import { DialogDeleteBillComponent } from './bills/delete-bill.component';



// Navigation
//import { SidenavAutosizeExample } from './dashboard/dashboard.component';


// Graphs import packages

import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import * as TimeSeries from 'fusioncharts/fusioncharts.timeseries';
import { NewsComponent } from './news/news.component';
import { DialogRegisterConfirmationComponent } from './register/register-confirmation.component';



FusionChartsModule.fcRoot(
  FusionCharts,
  Charts,
  FusionTheme,
  TimeSeries,
)


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MenuListItemComponent,
    BillsComponent,
    ProfileComponent,
    RegisterComponent,
    RestartPasswordComponent,
    SettingsComponent,
    DialogChangePasswordComponent,
    DialogEditProfileComponent,
    GraphComponent,
    NewsComponent,
    DialogNewBillComponent,
    DialogShowBillComponent,
    DialogRegisterConfirmationComponent,
    DialogDeleteBillComponent,
    //SidenavAutosizeExample,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule, // Angular material
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCardModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDialogModule,
    FusionChartsModule,
    //ChartsModule,
    //VERSION,
  ],
  entryComponents: [DialogChangePasswordComponent, DialogEditProfileComponent, DialogNewBillComponent, DialogShowBillComponent, DialogRegisterConfirmationComponent, DialogDeleteBillComponent],
  providers: [NavService, {provide: HTTP_INTERCEPTORS, useClass: JWTHeaderInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
