import { inject, Injectable, Signal, signal } from '@angular/core';
import { Database } from '@angular/fire/database';


export interface Member {
  fullName: string,
  id: string,
  image: string,
  email: string,
}

export interface ShortMember {
  fullName: string,
  id: string,
  image: string,
}

export interface Channel {
  id: string,
  created: Date,
  name: string,
  description: string,
  createdBy: ShortMember,
  members: ShortMember[]
}

export interface Message {
  id: string,
  created: Date,
  createdBy: ShortMember,
  content: string,
  channel: string
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private db: Database = inject(Database);

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
    //this.setUser(this.dummyUser);
  }


  /**
   * Simulated API call to fetch the contacts of the logged-in user.
   */
  fetchContacts() {
    //this.setContacts(this.dummyContacts);
  }


  /**
   * Simulated API call to fetch all Channels for the current logged-in user.
   */
  fetchChannels() {
    //this.setAllChannels(filteredChannels);
  }


  fetchCurrentChannel(id: string) {
    //this.setCurrentChannel(currentChannel || this.dummyCurrentChannel);
  }


  /**
   * Simulated API call to fetch all Direct Message Channels for the current logged-in user.
   */
  fetchDirectMessages() {
    //this.setAllDirectMessages(filteredDMs);
  }


  /**
   * Simulated API call to fetch all Messages of a particular Channel or Direct Message Channel.
   */
  fetchMessages(id: string) {
    //this.setMessages(filteredMessages); // For demo the messages main channel is always loaded first.
  }


  sendMessage(message: string) {
    //
  }

}
