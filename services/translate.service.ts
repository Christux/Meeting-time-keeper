export class TranslateService {
  private readonly defaultLanguage = 'en';
  private readonly browserLanguages: string[];

  constructor() {
    this.browserLanguages = [...window.navigator.languages];
  }

  initThenTranslateToBrowserLanguage(): void {
    this.translateAllElements(this.browserLanguages);
  }

  private getTranslateElements(root: HTMLElement | Document): HTMLElement[] {
    return Array.from(
      root.getElementsByTagName(
        'app-translate'
      ) as HTMLCollectionOf<HTMLElement>
    );
  }

  translateAllElements(languages: string[], root: HTMLElement | Document = document): void {
    this.getTranslateElements(root).forEach((element) => {
      this.translateElement(element, languages);
    });
  }

  private translateElement(element: HTMLElement, languages: string[]): void {
    for (let i = 0, l = languages.length; i < l; i++) {
      const langage = languages[i];
      if (element.hasAttribute(langage)) {
        // backup default message
        if (!element.hasAttribute(this.defaultLanguage)) {
          element.setAttribute(this.defaultLanguage, element.innerText);
        }
        element.innerText = element.getAttribute(langage) ?? '';
        break;
      }
    }
  }
}
