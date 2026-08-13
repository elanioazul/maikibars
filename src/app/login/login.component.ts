import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly submitted = signal(false);
  protected readonly submitting = signal(false);
  protected readonly hidePassword = signal(true);

  protected readonly form = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(4)] }),
    rememberMe: new FormControl(false, { nonNullable: true }),
  });

  protected readonly emailControl = this.form.controls.email;
  protected readonly passwordControl = this.form.controls.password;

  private readonly formStatus = toSignal(this.form.statusChanges, { initialValue: this.form.status });

  protected readonly isFormValid = computed(() => this.formStatus() === 'VALID');

  protected togglePasswordVisibility(): void {
    this.hidePassword.update((hidden) => !hidden);
  }

  protected onSubmit(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.showToast('Please enter a valid email and a password of at least 8 characters.', 'login-snackbar-error');
      return;
    }

    this.submitting.set(true);

    timer(650).pipe(take(1)).subscribe(() => {
      const success = this.authService.login(this.emailControl.value, this.passwordControl.value);
      this.submitting.set(false);

      if (success) {
        this.showToast(`Welcome back, ${this.authService.user()}.`, 'login-snackbar-success');
        void this.router.navigateByUrl('/visor');
      } else {
        this.showToast('Invalid email or password. Please try again.', 'login-snackbar-error');
      }
    });
  }

  protected showToast(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Close', { duration: 4000, panelClass });
  }
}
