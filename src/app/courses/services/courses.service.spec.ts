import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { COURSES } from "../../../../server/db-data";
import { CoursesService } from "./courses.service";

describe('CoursesService', () => {
    let coursesService: CoursesService,
        httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [CoursesService],
        })
        coursesService = TestBed.inject(CoursesService);
        httpTestingController = TestBed.inject(HttpTestingController)
    });

    it('should retrieve all courses', () => {
        coursesService.findAllCourses().subscribe(
            courses => {
                expect(courses).toBeTruthy('No courses returned');

                expect(courses.length).toBe(12, 'Incorrect number of courses');

                const course = courses.find(course => course.id === 2);

                expect(course.titles.description).toBe('Angular Core Deep Dive');
            }
        );

        const req = httpTestingController.expectOne('/api/courses');

        expect(req.request.method).toEqual('GET');

        req.flush({payload: Object.values(COURSES)});
    });

    it('should find a course by id', () => {
        coursesService.findCourseById(3).subscribe(
            course => {
                expect(course).toBeTruthy('response is not truthy');
                expect(course.titles.description).toBe('RxJs In Practice Course');
            }
        );
        
        const req = httpTestingController.expectOne('/api/courses/3');
        expect(req.request.method).toEqual('GET');
        
        req.flush(COURSES[3]);
    });

    afterEach(() => {
        httpTestingController.verify();
    });
});