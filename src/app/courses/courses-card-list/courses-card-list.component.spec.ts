import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';




describe('CoursesCardListComponent', () => {

    let component: CoursesCardListComponent;
    let fixture: ComponentFixture<CoursesCardListComponent>;
    let el: DebugElement;

    // beforeEach(async () => {
    //     await TestBed.configureTestingModule({
    //         imports: [ CoursesModule ]
    //     }).compileComponents();
    // });

    // beforeEach(() => {
    //     fixture = TestBed.createComponent(CoursesCardListComponent);
    //     component = fixture.componentInstance;
    // });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ CoursesModule ]
        })
        .compileComponents()
        .then(() => {
            fixture = TestBed.createComponent(CoursesCardListComponent);
            component = fixture.componentInstance;
            el = fixture.debugElement;
        });
    }));
    
    
    it("should create the component", () => {
        
        expect(component).toBeTruthy();
        
    });
    
    
    it("should display the course list", () => {
        
        component.courses = setupCourses();
        fixture.detectChanges();
        console.log(el.nativeElement.outerHTML);

        const cards = el.queryAll(By.css('.course-card '));

        expect(cards).toBeTruthy();

        expect(cards.length).toBe(12, 'Unexpected number of courses');
        
    });
    
    
    it("should display the first course", () => {
        
        component.courses = setupCourses();

        fixture.detectChanges();

        const course = component.courses[0];

        expect(course).toBeTruthy();

        const card = el.queryAll(By.css('mat-card')),
                title = card[0].query(By.css('mat-card-title')),
                img = card[0].query(By.css('img'));

        expect(card).toBeTruthy();

        expect(title.nativeElement.textContent).toBe(course.titles.description);

        expect(img.nativeElement.src).toBe(course.iconUrl);
        
    });
    
    
});


