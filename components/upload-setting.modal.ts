import { ModalComponent, ModalInjection } from '../services/modal.service';

export class UploadSettingModal extends ModalComponent<
  File,
  UploadSettingModalInjection
> {
  protected htmlElement: HTMLElement | DocumentFragment;

  constructor(modalInjection: UploadSettingModalInjection) {
    super(modalInjection);

    const template = this.documentQuerySelector(
      '#upload-setting-modal'
    ) as HTMLTemplateElement;

    this.htmlElement = document.importNode(template.content, true);
  }

  protected buildComponent(): void {}

  protected updateComponent(): void {
    throw new Error('Method not implemented.');
  }
}

export interface UploadSettingModalInjection extends ModalInjection<File> {}
