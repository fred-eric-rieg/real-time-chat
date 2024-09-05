import { Injectable, Signal, signal } from '@angular/core';


export interface Member {
  fullName: string,
  id: number,
  image: string,
  email: string,
}

export interface ShortMember {
  fullName: string,
  id: number,
  image: string,
}

export interface Channel {
  id: number,
  created: Date,
  name: string,
  description: string,
  createdBy: ShortMember,
  members: ShortMember[]
}

export interface Message {
  id: number,
  created: Date,
  createdBy: ShortMember,
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
      image: "profile8.jpg",
      email: "hansdieter@mail.de"
    }


  dummyContacts: ShortMember[] = [
    { fullName: "Hans Dieter", id: 1, image: "profile8.jpg" },
    { fullName: "Thomas Müller", id: 2, image: "profile8.jpg" },
    { fullName: "Klausi Mayer", id: 3, image: "profile8.jpg" },
    { fullName: "Marie Löffel", id: 4, image: "profile8.jpg" },
    { fullName: "Renate Bäcker", id: 5, image: "profile8.jpg" },
    { fullName: "Ingrid Kaiser", id: 6, image: "profile8.jpg" },
  ]


  dummyMessages: Message[] = [
    {
      id: 1,
      created: new Date(),
      createdBy: { id: 1, fullName: "Dieter Müller", image: "/profile8.jpg" },
      content: "First Message of the Day.",
      channel: 1
    },
    {
      id: 2,
      created: new Date(),
      createdBy: { id: 1, fullName: "Dieter Müller", image: "profile8.jpg" },
      content: "Second Message of the Day.",
      channel: 1
    },
    {
      id: 3,
      created: new Date(),
      createdBy: { id: 1, fullName: "Dieter Müller", image: "profile8.jpg" },
      content: "Third Message of the Day.",
      channel: 1
    },
    {
      id: 4,
      created: new Date(),
      createdBy: { id: 1, fullName: "Dieter Müller", image: "profile8.jpg" },
      content: "I am writing a very long text in order to see the impact on the UI when writing that much. In fact, there is even more. Let me elaborate.",
      channel: 1
    },
  ]


  dummyCurrentChannel: Channel =
    {
      id: 1,
      created: new Date(),
      name: "Main Channel",
      description: "Another channel about general stuff.",
      createdBy: { fullName: "Thomas Müller", id: 2, image: "profile8.jpg" },
      members: [
        { fullName: "Hans Dieter", id: 1, image: "profile8.jpg" },
        { fullName: "Thomas Müller", id: 2, image: "profile8.jpg" },
        { fullName: "Klausi Mayer", id: 3, image: "profile8.jpg" },
        { fullName: "Marie Löffel", id: 4, image: "profile8.jpg" },
        { fullName: "Renate Bäcker", id: 5, image: "profile8.jpg" },
        { fullName: "Ingrid Kaiser", id: 6, image: "profile8.jpg" },
      ]
    }


  dummyAllChannels: Channel[] = [
    {
      id: 1,
      created: new Date(),
      name: "Main Channel",
      description: "Another channel about general stuff.",
      createdBy: { fullName: "Thomas Müller", id: 2, image: "profile8.jpg" },
      members: [
        { fullName: "Hans Dieter", id: 1, image: "profile8.jpg" },
        { fullName: "Thomas Müller", id: 2, image: "profile8.jpg" },
        { fullName: "Klausi Mayer", id: 3, image: "profile8.jpg" },
        { fullName: "Marie Löffel", id: 4, image: "profile8.jpg" },
        { fullName: "Renate Bäcker", id: 5, image: "profile8.jpg" },
        { fullName: "Ingrid Kaiser", id: 6, image: "profile8.jpg" },
      ]
    },
    {
      id: 2,
      created: new Date(),
      name: "Second Channel",
      description: "Another channel about specific stuff.",
      createdBy: { fullName: "Klausi Mayer", id: 3, image: "profile8.jpg" },
      members: [
        { fullName: "Hans Dieter", id: 1, image: "profile8.jpg" },
        { fullName: "Thomas Müller", id: 2, image: "profile8.jpg" },
        { fullName: "Klausi Mayer", id: 3, image: "profile8.jpg" },
      ]
    },
    {
      id: 3,
      created: new Date(),
      name: "Third Channel",
      description: "Another channel about nieche stuff.",
      createdBy: { fullName: "Ingrid Kaiser", id: 6, image: "profile8.jpg" },
      members: [
        { fullName: "Hans Dieter", id: 1, image: "profile8.jpg" },
        { fullName: "Klausi Mayer", id: 3, image: "profile8.jpg" },
        { fullName: "Ingrid Kaiser", id: 6, image: "profile8.jpg" },
      ]
    }
  ]


  dummyAllDMs: Channel[] = [
    {
      id: 4,
      created: new Date(),
      name: "Direct Message",
      description: "Just between you and a friend.",
      createdBy: { fullName: "Thomas Müller", id: 2, image: "profile8.jpg" },
      members: [
        { fullName: "Thomas Müller", id: 2, image: "profile8.jpg" },
        { fullName: "Klausi Mayer", id: 3, image: "profile8.jpg" },
      ]
    },
    {
      id: 5,
      created: new Date(),
      name: "Direct Message",
      description: "Just between you and a friend.",
      createdBy: { fullName: "Klausi Mayer", id: 3, image: "profile8.jpg" },
      members: [
        { fullName: "Klausi Mayer", id: 3, image: "profile8.jpg" },
        { fullName: "Hans Dieter", id: 1, image: "profile8.jpg" },
      ]
    },
    {
      id: 6,
      created: new Date(),
      name: "Direct Message",
      description: "Just between you and a friend.",
      createdBy: { fullName: "Ingrid Kaiser", id: 6, image: "profile8.jpg" },
      members: [
        { fullName: "Ingrid Kaiser", id: 6, image: "profile8.jpg" },
        { fullName: "Renate Bäcker", id: 5, image: "profile8.jpg" },
      ]
    }
  ]


  private user = signal<Member | null>(null);

  private contacts = signal<ShortMember[]>([]);

  private currentChannel = signal<Channel | null>(null);

  private allChannels = signal<Channel[]>([]);

  private allDirectMessages = signal<Channel[]>([]);

  private currentDirectMessage = signal<Channel[]>([]);

  private allMessages = signal<Message[]>([]);


  constructor() {
  }

  // Getters and Setters for Signals

  setUser(data: Member) {
    this.user.set(data);
  }


  getUser(): Signal<Member | null> {
    return this.user;
  }


  setContacts(data: ShortMember[]) {
    this.contacts.set(data);
  }


  getContacts(): Signal<ShortMember[]> {
    return this.contacts;
  }


  setCurrentChannel(data: Channel) {
    this.currentChannel.set(data);
  }


  getCurrentChannel(): Signal<Channel | null> {
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


  setMessages(data: Message[]) {
    this.allMessages.set(data);
  }


  getMessages(): Signal<Message[]> {
    return this.allMessages;
  }


  // API calls to Firestore

  /**
   * Simulated API call to fetch the current logged-in user.
   */
  fetchUser() {
    this.setUser(this.dummyUser);
  }


  /**
   * Simulated API call to fetch the contacts of the logged-in user.
   */
  fetchContacts() {
    this.setContacts(this.dummyContacts);
  }


  /**
   * Simulated API call to fetch all Channels for the current logged-in user.
   */
  fetchChannels() {
    let filteredChannels = this.dummyAllChannels.filter(channel => channel.members.some(member => member.id === this.dummyUser.id));
    this.setAllChannels(filteredChannels);
  }


  fetchCurrentChannel(id: number) {
    let currentChannel = this.dummyAllChannels.find(channel => channel.id === id);
    this.setCurrentChannel(currentChannel || this.dummyCurrentChannel);
  }


  /**
   * Simulated API call to fetch all Direct Message Channels for the current logged-in user.
   */
  fetchDirectMessages() {
    let filteredDMs = this.dummyAllDMs.filter(dm => dm.members.some(member => member.id === this.dummyUser.id));
    this.setAllDirectMessages(filteredDMs);
  }


  /**
   * Simulated API call to fetch all Messages of a particular Channel or Direct Message Channel.
   */
  fetchMessages(id: number) {
    let filteredMessages = this.dummyMessages.filter(message => message.channel === id);
    this.setMessages(filteredMessages); // For demo the messages main channel is always loaded first.
  }


  sendMessage(message: string) {
    let old = this.getMessages();
    let currentChannel = this.getCurrentChannel()
    let combined = old().concat(
      [{
        id: old().length + 1,
        created: new Date(),
        createdBy: this.dummyUser,
        content: message,
        channel: currentChannel()?.id || 0
      },]
    );
    this.setMessages(combined);
  }

}
