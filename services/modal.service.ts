import { Component } from '../core/components/component';
import { StringValueRenderer } from '../core/value-renderer/string-value-renderer';

export class ModalService {
  private modalComponent: InternalModalComponent;

  constructor() {
    this.modalComponent = new InternalModalComponent();
    this.modalComponent.build();
  }

  open<U, V extends ModalInjection<U>>(
    modalComponent: new (modalInjection: V) => ModalComponent<U, V>,
    modalInjection: V
  ): void {
    const returnCallback = modalInjection.returnCallback;

    modalInjection.returnCallback = (result: U | null) => {
      returnCallback(result);
      this.close();
    };

    this.modalComponent.open(
      modalInjection.modalTitle,
      new modalComponent(modalInjection),
      returnCallback
    );
  }

  close(): void {
    this.modalComponent.close();
  }

  protected documentQuerySelector<T extends Element = HTMLElement>(
    selectors: string
  ): T {
    const element = document.querySelector<T>(selectors);

    if (!element) {
      throw new Error(`Element ${selectors} was not found !`);
    }

    return element;
  }
}

export interface ModalInjection<T> {
  modalTitle: string;
  returnCallback: (result: T | null) => void;
}

export abstract class ModalComponent<
  T,
  V extends ModalInjection<T>
> extends Component {
  constructor(protected modalInjection: V) {
    super();
  }

  getElement(): HTMLElement | DocumentFragment {
    return this.htmlElement;
  }
}

class InternalModalComponent extends Component {
  protected htmlElement: HTMLElement;
  private contentElement: HTMLElement;
  private bodyElement: HTMLElement;
  private closeButton: HTMLElement;
  private title: StringValueRenderer;
  private returnNullCallback: ((result: null) => void) | null = null;

  constructor() {
    super();
    this.htmlElement = this.documentQuerySelector('.modal');
    this.contentElement = this.querySelector('.modal-content');
    this.bodyElement = this.querySelector('.modal-body');
    this.closeButton = this.querySelector('.close');
    this.title = new StringValueRenderer(this.querySelector('.title'));
  }

  protected buildComponent(): void {
    this.htmlElement.addEventListener('click', () => {
      if (this.returnNullCallback) {
        this.returnNullCallback(null);
      }
      this.close();
    });
    this.contentElement.addEventListener('click', (ev) => {
      ev.stopImmediatePropagation();
    });
    this.closeButton.addEventListener('click', () => {
      if (this.returnNullCallback) {
        this.returnNullCallback(null);
      }
      this.close();
    });
  }

  protected updateComponent(): void {}

  open<T, V extends ModalInjection<T>>(
    modalTitle: string,
    modalComponent: ModalComponent<T, V>,
    returnNullCallback: (result: null) => void
  ): void {
    this.returnNullCallback = returnNullCallback;
    this.bodyElement.appendChild(modalComponent.getElement());
    modalComponent.build();
    this.title.render(modalTitle);
    this.showElement(this.htmlElement);
  }

  close(): void {
    if (this.returnNullCallback) {
      this.returnNullCallback = null;
    }
    this.hideElement(this.htmlElement);
    this.title.render('');
    this.bodyElement.innerHTML = '';
  }
}
