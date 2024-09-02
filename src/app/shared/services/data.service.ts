import { Injectable, Signal, signal } from '@angular/core';

export interface Member {
  fullName: string,
  id: number
}

export interface Channel {
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

  dummyCurrentChannel: Channel[] = [
    {
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


  dummyAllChannels: Channel[] = [
    {
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


  dummyCurrentDM: Channel[] = [
    {
      created: new Date(),
      name: "Direct Message",
      description: "Just between you and a friend.",
      createdBy: { fullName: "Thomas Müller", id: 2 },
      members: [
        { fullName: "Thomas Müller", id: 2 },
        { fullName: "Ingrid Kaiser", id: 6 },
      ]
    }
  ]


  dummyAllDMs: Channel[] = [
    {
      created: new Date(),
      name: "Direct Message",
      description: "Just between you and a friend.",
      createdBy: { fullName: "Thomas Müller", id: 2 },
      members: [
        { fullName: "Thomas Müller", id: 2 },
        { fullName: "Klausi Mayer", id: 3 },
      ]
    },
    {
      created: new Date(),
      name: "Direct Message",
      description: "Just between you and a friend.",
      createdBy: { fullName: "Klausi Mayer", id: 3 },
      members: [
        { fullName: "Klausi Mayer", id: 3 },
        { fullName: "Hans Dieter", id: 1 },
      ]
    },
    {
      created: new Date(),
      name: "Direct Message",
      description: "Just between you and a friend.",
      createdBy: { fullName: "Ingrid Kaiser", id: 6 },
      members: [
        { fullName: "Ingrid Kaiser", id: 6 },
        { fullName: "Renate Bäcker", id: 5 },
      ]
    }
  ]


  private currentChannel = signal<Channel[]>([]);

  private allChannels = signal<Channel[]>([]);

  private allDirectMessages = signal<Channel[]>([]);

  private currentDirectMessage = signal<Channel[]>([]);


  constructor() {
    // Testdaten
    this.setCurrentChannel(this.dummyCurrentChannel);
    this.setAllChannels(this.dummyAllChannels);
    this.setAllDirectMessages(this.dummyAllDMs);
    this.setCurrentDirectMessage(this.dummyCurrentDM);
  }


  setCurrentChannel(data: Channel[]) {
    this.currentChannel.set(data);
  }


  getCurrentChannel(): Signal<Channel[]> {
    return this.currentChannel;
  }


  setAllChannels(data: Channel[]) {
    this.allChannels.set(data);
  }


  getAllChannels(): Signal<Channel[]> {
    return this.allChannels;
  }


  setAllDirectMessages(data: Channel[]) {
    this.allDirectMessages.set(data);
  }


  getAllDirectMessages(): Signal<Channel[]> {
    return this.allDirectMessages;
  }


  setCurrentDirectMessage(data: Channel[]) {
    this.currentDirectMessage.set(data);
  }


  getCurrentDirectMessage(): Signal<Channel[]> {
    return this.currentDirectMessage;
  }
}
