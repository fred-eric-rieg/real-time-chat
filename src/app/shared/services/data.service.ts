import { Injectable, Signal, signal } from '@angular/core';

export interface Member {
  fullName: string,
  id: number
}

export interface Channel {
  isChannel: boolean,
  isThread: boolean,
  isDirectMessage: boolean,
  created: Date,
  name: string,
  description: string,
  createdBy: Member,
  members: Member[]
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dummyData: Channel[] = [
    {
      isChannel: true,
      isThread: false,
      isDirectMessage: false,
      created: new Date(),
      name: "Main Channel",
      description: "Another channel about general stuff.",
      createdBy: { fullName: "Thomas Müller", id: 2 },
      members: [
        { fullName: "Hans Dieter", id: 1 },
        { fullName: "Thomas Müller", id: 2 },
        { fullName: "Klausi Mayer", id: 3 },
        { fullName: "Marie Löffel", id: 4 },
        { fullName: "Renate Bäcker", id: 5 },
        { fullName: "Ingrid Kaiser", id: 6 },
      ]
    }
  ]


  dummyData2: Channel[] = [
    {
      isChannel: true,
      isThread: false,
      isDirectMessage: false,
      created: new Date(),
      name: "Main Channel",
      description: "Another channel about general stuff.",
      createdBy: { fullName: "Thomas Müller", id: 2 },
      members: [
        { fullName: "Hans Dieter", id: 1 },
        { fullName: "Thomas Müller", id: 2 },
        { fullName: "Klausi Mayer", id: 3 },
        { fullName: "Marie Löffel", id: 4 },
        { fullName: "Renate Bäcker", id: 5 },
        { fullName: "Ingrid Kaiser", id: 6 },
      ]
    },
    {
      isChannel: true,
      isThread: false,
      isDirectMessage: false,
      created: new Date(),
      name: "Second Channel",
      description: "Another channel about specific stuff.",
      createdBy: { fullName: "Klausi Mayer", id: 3 },
      members: [
        { fullName: "Hans Dieter", id: 1 },
        { fullName: "Thomas Müller", id: 2 },
        { fullName: "Klausi Mayer", id: 3 },
      ]
    },
    {
      isChannel: true,
      isThread: false,
      isDirectMessage: false,
      created: new Date(),
      name: "Third Channel",
      description: "Another channel about nieche stuff.",
      createdBy: { fullName: "Ingrid Kaiser", id: 6 },
      members: [
        { fullName: "Hans Dieter", id: 1 },
        { fullName: "Klausi Mayer", id: 3 },
        { fullName: "Ingrid Kaiser", id: 6 },
      ]
    }
  ]



  private currentChannel = signal<Channel[]>([]);

  private allChannels = signal<Channel[]>([]);

  constructor() {
    // For testing, this single chat is inserted into the signal.
    this.setCurrentChannel(this.dummyData);
    this.setAllChannels(this.dummyData2)
  }


  // Method to set the Chat instances
  setCurrentChannel(data: Channel[]) {
    this.currentChannel.set(data);
  }


  // Method to get the current Chat instances
  getCurrentChannel(): Signal<Channel[]> {
    return this.currentChannel;
  }


  // Method to set the Chat instances
  setAllChannels(data: Channel[]) {
    this.allChannels.set(data);
  }


  // Method to get the current Chat instances
  getAllChannels(): Signal<Channel[]> {
    return this.allChannels;
  }
}
