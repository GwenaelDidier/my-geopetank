import { MyGeopetankAppPage } from './app.po';

describe('my-geopetank-app App', function() {
  let page: MyGeopetankAppPage;

  beforeEach(() => {
    page = new MyGeopetankAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
