import { Chapter, MeetingSetting } from '../core/meeting-setting';
import { Notifier } from '../core/notifier/notifier';

export class SettingService extends Notifier {
  
  constructor(private currentSetting: MeetingSetting) {
    super();
  }

  get setting(): MeetingSetting {
    return this.currentSetting;
  }

  get title(): string {
    return this.currentSetting.title;
  }

  get duration(): number {
    return this.currentSetting.duration;
  }

  get chapters(): Chapter[] {
    return this.currentSetting.chapters;
  }
}
