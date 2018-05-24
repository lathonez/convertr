import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Logger } from '../logger';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Advertiser } from '../advertiser.model';

@Component({
  selector: 'app-add-advertiser',
  templateUrl: './add-advertiser.component.html',
  styleUrls: ['./add-advertiser.component.scss']
})
export class AddAdvertiserComponent implements OnInit {

  private fb: FormBuilder;

  @Output() public newAdvertiser: EventEmitter<Advertiser>; // output emitter used to inform the parent component when submit is clicked
  public form: FormGroup;


  /**
   * Child component of AdvertisersComponent responsible for adding anew
   *
   * @param {FormBuilder} fb
   */
  constructor(fb: FormBuilder) {
    this.newAdvertiser = new EventEmitter<Advertiser>();
    this.fb = fb;
  }

  /**
   * Submit the new Advertiser to the parent componetn
   */
  public doSubmit(): void {
    this.newAdvertiser.emit(this.form.value);

    // There's a bug here where form validation is triggered on reset - I can't find a fix
    // without implementing custom form controls, which I do not have time to do here.
    // However - feel there should be a very simple solution!
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.form.updateValueAndValidity();
  }

  /**
   * Initialise the form controls on init
   */
  public ngOnInit(): void {
    this.initForm(this.fb);
  }

  //
  // Private Functions
  //

  /**
   * Create form group and setup controls
   *
   * @param {FormBuilder} fb
   */
  private initForm(fb: FormBuilder): void {
    this.form = fb.group({});
    this.form.addControl('name', new FormControl(null, Validators.required));
    this.form.addControl('orgurl', new FormControl(null, Validators.required));
    this.form.addControl('firstName', new FormControl(null, Validators.required));
    this.form.addControl('lastName', new FormControl(null, Validators.required));
    this.form.addControl('email', new FormControl(null, Validators.required));
    this.form.addControl('telephone', new FormControl(null, Validators.required));
    this.form.addControl('address', new FormControl(null, Validators.required));
    this.form.addControl('city', new FormControl(null, Validators.required));
    this.form.addControl('postcode', new FormControl(null, Validators.required));
  }
}
