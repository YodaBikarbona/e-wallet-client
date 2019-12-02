import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  news = [];
  error_message = '';

  constructor(public userService: UserService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.userService.getNews().subscribe((data: any) => {
      this.news = data.news;
      this.spinner.hide();
    }, (data: any) => {
        this.error_message = data.error.message;
        this.spinner.hide();
      });
  }

  clear(newsId: number) {
    this.spinner.show();
    this.userService.clearNews(newsId).subscribe((data: any) => {
      this.userService.getNews().subscribe((data: any) => {
        this.news = data.news;
        this.spinner.hide();
      }, (data: any) => {
        this.error_message = data.error.message;
        this.spinner.hide();
      })}, (data: any) => {
        this.error_message = data.error.message;
        this.spinner.hide();
    });
  }

}
