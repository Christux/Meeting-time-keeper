import {
  TestModalComponent,
  TestModalInjection,
} from './components/test-modal.component';
import { MeetingSetting } from './core/meeting-setting';
import { download } from './core/utils';
import { Meeting } from './meeting';
import { ModalService } from './services/modal.service';
import './style.scss';

const meetingSetting: MeetingSetting = {
  title: 'Démo de fin de sprint',
  duration: 1,
  chapters: [
    {
      title: 'Bienvenue',
      sections: [
        {
          title: 'Introduction',
          speaker: 'Equipe animation',
          duration: 0.25,
        },
        {
          title: 'Actualités',
          duration: 0.5,
        },
      ],
    },
  ],
};

new Meeting(meetingSetting).bootstrap();

// const modalSvc = new ModalService();

// modalSvc.open<string, TestModalInjection>(TestModalComponent, {
//   modalTitle: 'Coucou',
//   returnCallback: (result) => console.log(result),
//   message: 'coucou',
// });

//download('config.json', meetingSetting);
