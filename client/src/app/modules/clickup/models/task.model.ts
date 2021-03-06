import { Status } from './status.model';
import { UserTrackedTime } from './user-tracked-time.model';

export class Task {
  listId: string | null;
  parentId: string | null;
  id: string | null;
  name: string;
  description: string;
  status: Status;
  order: number;
  time: {
    estimated: string | null;
    spent: string | null;
    data: UserTrackedTime[];
  };

  // region static methods

  static from(data: any): Task {
    return new Task({
      listId: data.list.id,
      parentId: data.parent,
      id: data.id,
      name: data.name,
      description: data.description,
      status: Status.from(data.status),
      order: data.orderindex,
      time: {
        estimated: data.time_estimate,
        spent: data.time_spent,
        data: Object.values(data.timeTracking?.data || []).map(value => UserTrackedTime.from(value)) || []
      },
    });
  }

  private static timeAsReadableString(time: string | null): string {
    if (time == null) {
      return '-';
    }

    const milliseconds = parseInt(time, 10);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

    return `${hours}h${minutes}m`;
  }

  // endregion

  // region instance methods

  constructor(init: object = {}) {
    Object.assign(this, init);
  }

  timeSpentAsReadableString(): string | null {
    return Task.timeAsReadableString(this.time.spent);
  }

  timeEstimatedAsReadableString(): string | null {
    return Task.timeAsReadableString(this.time.spent);
  }

  // endregion
}
