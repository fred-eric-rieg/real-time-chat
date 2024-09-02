import { Injectable, Signal, signal } from '@angular/core';


export interface Member {
  fullName: string,
  id: number
}

export interface Channel {
  id: number,
  created: Date,
  name: string,
  description: string,
  createdBy: Member,
  members: Member[]
}

export interface Message {
  id: number,
  created: Date,
  createdBy: Member,
  content: string,
  channel: number
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dummyUser: Member =
    {
      fullName: "Hans Dieter",
      id: 1,
  }


  dummyMessages:  Message[] = [
    {
      id: 1,
      created: new Date(),
      createdBy: { id: 1, fullName: "Dieter Müller" },
      content: "First Message of the Day.",
      channel: 1
    },
    
  ]


  dummyCurrentChannel: Channel[] = [
    {
      id: 1,
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
      id: 1,
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
      id: 2,
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
      id: 3,
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


  dummyAllDMs: Channel[] = [
    {
      id: 4,
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
      id: 5,
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
      id: 6,
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

  private user = signal<Member>({ id: 0, fullName: "Administrator" });

  private currentChannel = signal<Channel[]>([]);

  private allChannels = signal<Channel[]>([]);

  private allDirectMessages = signal<Channel[]>([]);

  private currentDirectMessage = signal<Channel[]>([]);

  private allMessages = signal<Message[]>([]);


  constructor() {
    // Testdaten
    this.setUser(this.dummyUser);
    this.setCurrentChannel(this.dummyCurrentChannel);

    let filteredChannels = this.dummyAllChannels.filter(channel => channel.members.some(member => member.id === this.dummyUser.id));

    this.setAllChannels(filteredChannels);

    let filteredDMs = this.dummyAllDMs.filter(dm => dm.members.some(member => member.id === this.dummyUser.id));

    this.setAllDirectMessages(filteredDMs);

    this.setMessages(1); // For demo the messages main channel is always loaded first.
  }


  setUser(data: Member) {
    this.user.set(data);
  }


  getUser() {
    return this.user;
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


  setMessages(id: number) {
    let filteredMessages = this.dummyMessages.filter(message => message.channel === id);
    this.allMessages.set(filteredMessages);
  }


  getMessages(): Signal<Message[]> {
    return this.allMessages;
  }
}
