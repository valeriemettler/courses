import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CoursesService} from "../courses.service";
import {Observable} from "rxjs/Rx";
import {Course} from "../shared/model/course";
import {Lesson} from "../shared/model/lesson";
import {FirebasePage} from "../shared/model/firebase-page";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  static PAGE_SIZE = 3;

  course:Course;
  lessonsPage:FirebasePage<Lesson>;

  constructor(private route:ActivatedRoute, private coursesService:CoursesService) {

  }

  ngOnInit() {

    const course$ = this.route.params.switchMap(params =>  this.coursesService.findCourseByUrl(params['id']));

    course$.subscribe(course => this.course = course);

    course$.switchMap(course => this.coursesService.loadCourseLessonsPage(course.$key, CourseDetailComponent.PAGE_SIZE ))
      .subscribe(lessonsPage => this.lessonsPage = lessonsPage);

  }

  previous() {

  }

  next() {

    console.log('next page');

    this.coursesService.loadNextPage(this.course.$key, CourseDetailComponent.PAGE_SIZE, this.lessonsPage )
      .subscribe(lessonsPage => this.lessonsPage = lessonsPage);
  }

}
