// angular
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// framework
import { SharedModule } from '~/app/framework/core/shared.module';
import { MaterialModule } from '~/app/framework/material/material.module';

// testing
import { I18NTestingModule } from '~/app/framework/i18n/testing/i18n-testing.module';
import { t } from '~/app/framework/testing';

// module
import { AboutApplePearComponent } from './about-apple-pear.component';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      MaterialModule,
      SharedModule,
      I18NTestingModule
    ],
    declarations: [AboutApplePearComponent]
  });
};

t.describe('ng-seed/universal', () => {
  t.describe('+about: AboutApplePearComponent', () => {
    t.be(testModuleConfig);

    t.it('should build without a problem', t.async(() => {
      TestBed.compileComponents()
        .then(() => {
          const fixture = TestBed.createComponent(AboutApplePearComponent);
          const instance = fixture.debugElement.componentInstance;
          t.e(instance)
            .toBeTruthy();
        });
    }));
  });
});
