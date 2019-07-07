import {Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSidenavModule } from '@angular/material';
//import { VERSION } from '@angular/material';
import { NavItem } from './nav-item';
import { NavService } from './nav.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private navService: NavService, private autenticationService: AuthenticationService) {}

  ngOnInit() {
    const role = this.autenticationService.role;
    if (role == 'admin') {
      this.navItems.push(
        {
        displayName: 'Admin',
        iconName: 'accessibility',
        route: "",
        children: [
          {
            displayName: 'Categories',
            iconName: '',
            route: 'categories',
          },
          {
            displayName: 'Sub categories',
            iconName: '',
            route: 'sub_categories',
          },
          {
            displayName: 'Currencies',
            iconName: '',
            route: 'currencies',
          },
          {
            displayName: 'Countries',
            iconName: '',
            route: 'countries',
          },
          {
            displayName: 'Cities',
            iconName: '',
            route: 'cities',
          },
        ]
      }
      );
    }
  }

  @ViewChild('appDrawer') appDrawer: ElementRef;
  //version = VERSION;
  navItems: NavItem[] = [
    {
      displayName: 'Profile',
      iconName: 'account_circle',
      route: 'profile',
    },
    {
      displayName: 'Bills',
      iconName: 'list_alt',
      route: "bills",
      /*children: [
        {
          displayName: 'Profits',
          iconName: 'attach_money',
          route: 'profits',
        },
        {
          displayName: 'Costs',
          iconName: 'money_off',
          route: 'costs',
        },
      ]*/
    },
    {
      displayName: 'Graph',
      iconName: 'equalizer',
      route: 'graph',
    },
    {
      displayName: 'Options',
      disabled: true,
      iconName: 'settings',
      route: 'settings',
    }
  ];

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

}

/*export class SidenavAutosizeExample {
  @ViewChild('sidenav') sidenav: MatSidenavModule;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}*/

/*export class AppComponent implements AfterViewInit {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  //version = VERSION;
  navItems: NavItem[] = [
    {
      displayName: 'Profile',
      iconName: 'account_circle',
    },
    {
      displayName: 'Bills',
      iconName: 'list_alt',
      children: [
        {
          displayName: 'Profits',
          iconName: 'attach_money',
        },
        {
          displayName: 'Costs',
          iconName: 'money_off',
        },
      ]
    },
    {
      displayName: 'Graphs',
      iconName: 'equalizer',
    },
    {
      displayName: 'Options',
      disabled: true,
      iconName: 'settings',
    }
  ];

  constructor(private navService: NavService) {
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
}*/
