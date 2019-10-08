import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  news = [];
  error_message = '';

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.userService.getNews().subscribe((data: any) => this.news = data.news, (data: any) => {
        this.error_message = data.error.message;
      });
  }

  clear(newsId: number) {
    console.log(newsId)
    this.userService.clearNews(newsId).subscribe((data: any) => {
      this.userService.getNews().subscribe((data: any) => this.news = data.news, (data: any) => {
        this.error_message = data.error.message;
      })}, (data: any) => {
        this.error_message = data.error.message;
    });
  }

}
