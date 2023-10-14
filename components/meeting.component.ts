import { Component } from '../core/components/component';
import { TimedMeetingService } from '../services/timed-meeting.service';
import { ChapterComponent } from './chapter.component';
import { HeaderComponent } from './header.component';
import { SectionComponent } from './section.component';

export class MeetingComponent extends Component {
  protected htmlElement: HTMLElement;
  private meetingSections: HTMLElement;

  constructor(private meetingService: TimedMeetingService) {
    super();
    this.htmlElement = this.documentQuerySelector(`body`);
    this.meetingSections = this.querySelector('#meetingSections');
  }

  protected buildComponent(): void {
    this.addChildComponent(new HeaderComponent(this.meetingService));

    this.meetingService.chapters.forEach((chapter) => {
      this.addChildComponent(
        new ChapterComponent(this.meetingSections, chapter)
      );

      chapter.sections.forEach((section) => {
        this.addChildComponent(
          new SectionComponent(this.meetingSections, section)
        );
      });
    });

    this.meetingService.onStart(() => {
      this.loopOnChildComponents((component) => {
        if (component instanceof SectionComponent) {
          component.showStartButton();
        }
      });
    });

    this.meetingService.onStop(() => {
      this.loopOnChildComponents((component) => {
        if (component instanceof SectionComponent) {
          component.hideAllButtons();
        }
      });
    });
  }

  protected updateComponent(): void {}
}
