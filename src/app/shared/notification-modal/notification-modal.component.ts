import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

interface Notification {
  title: string;
  message: string;
  date: Date;
}


export class NotificationModalComponent {

  notifications: Notification[] = [];

  private defaultNotifications: Notification[] = [
    {
      title: 'No new notifications',
      message: 'You are all caught up. There are no new messages at the moment.',
      date: new Date()
    }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { notifications?: Notification[] }
  ) {
    this.notifications =
      data?.notifications?.length
        ? data.notifications
        : this.defaultNotifications;
  }
}
