export interface Registration {
  id: string;

  name: string;

  email: string;

  phone: string;

  createdAt: string;

  assignment?: {
    id: string;

    timeslot: {
      slotTime: string;
    };
  };
}

export interface Timeslot {
  id: string;

  slotTime: string;
}