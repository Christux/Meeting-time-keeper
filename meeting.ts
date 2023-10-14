import { MeetingComponent } from './components/meeting.component';
import {
  UploadSettingModal,
  UploadSettingModalInjection,
} from './components/upload-setting.modal';
import { MeetingSetting } from './core/meeting-setting';
import { ModalService } from './services/modal.service';
import { SettingService } from './services/settings.service';
import { TimedMeetingService } from './services/timed-meeting.service';
import { TranslateService } from './services/translate.service';

export class Meeting {
  private meetingComponent: MeetingComponent | null = null;
  private settingService: SettingService;
  private meetingService: TimedMeetingService;
  private translateService: TranslateService;
  private modalService: ModalService;

  constructor(setting: MeetingSetting) {
    this.translateService = new TranslateService();
    this.modalService = new ModalService();
    this.settingService = new SettingService(setting);
    this.meetingService = new TimedMeetingService(this.settingService);
  }

  bootstrap() {
    this.modalService.open<File, UploadSettingModalInjection>(
      UploadSettingModal,
      {
        modalTitle: 'Import de la configuration',
        returnCallback: (result) => {
          this.buildApp(result);
        },
      }
    );

    // this.meetingComponent = new MeetingComponent(this.meetingService);
    // this.meetingComponent.build();
    // this.translateService.initThenTranslateToBrowserLanguage();

    // setInterval(() => {
    //   if (this.meetingComponent) {
    //     this.meetingService.update();
    //     this.meetingComponent.update();
    //   }
    // }, 500);
  }

  private buildApp(setting: File) {
    console.log(setting);
  }
}
