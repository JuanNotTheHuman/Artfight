"use strict";
import { EventEmitter } from 'events';
import { ArtfightScrapper } from './scrapper.js';
import { ClientEvents } from './Enumarables.js';
import { ClientUser, UserManager, MemberManager } from './user.js';
import { SubmitionManager } from './sumbition.js';
import { CharacterManager } from './character.js';
import { Cache } from './manager.js';
import { Complete } from './Enumarables.js';
import { MessageManager } from './message.js';
/**
 * @class ArtfightClient
 * @extends EventEmitter
 * @description A client for interacting with the Artfight API
 */
class ArtfightClient extends EventEmitter {
    /**
     * The client's scrapper
     */
    scrapper;
    /**
     * The client's user (the user that logged in via the client)
     */
    user;
    /**
     * Artfight's users
     */
    users;
    /**
     * Artfight's members
     */
    members;
    /**
     * Artfight's attacks
     */
    attacks;
    /**
     * Artfight's defenses
     */
    defenses;
    /**
     * Artfight's characters
     */
    characters;
    messages;
    /**
     * Allowed types (made for better CPU performance), specifies which types to fetch completely.
     */
    completes;
    constructor() {
        super();
        this.scrapper = new ArtfightScrapper(this);
        this.user = {}; // Initialize as an empty object and cast to ClientUser
        this.users = {}; // Initialize as an empty object and cast to UserManager
        this.members = {}; // Initialize as an empty object and cast to MemberManager
        this.attacks = {}; // Initialize as an empty object and cast to SubmitionManager
        this.defenses = {}; // Initialize as an empty object and cast to SubmitionManager
        this.characters = {}; // Initialize as an empty object and cast to CharacterManager
        this.messages = {};
        this.completes = Complete.None; // Initialize with default value
    }
    /**
     * Logs in the user and initializes the Artfight client.
     * Emits a `Ready` event when the client is ready.
     *
     * @param {string} username - Username for login
     * @param {string} password - Password for login
     * @param {Complete|Complete[]} completes - Allowed types (made for better CPU performance), specifies which types to fetch completely.
     * @fires ClientEvents.Ready - Emitted when the client is ready and logged in
     */
    async login(username, password, completes = Complete.None) {
        await this.scrapper.login(username, password);
        this.users = new UserManager(this, new Cache());
        this.attacks = new SubmitionManager(this, new Cache(), "attack");
        this.defenses = new SubmitionManager(this, new Cache(), "defense");
        this.characters = new CharacterManager(this, new Cache());
        this.members = new MemberManager(this, new Cache());
        this.user = await new ClientUser(this, username).init();
        this.messages = new MessageManager(this, new Cache());
        this.completes = completes;
        this.emit(ClientEvents.Ready, this);
    }
    on(event, listener) {
        if (event === ClientEvents.MessageReceived) {
            this.scrapper.listenClientUserMessageReceived();
        }
        return super.on(event, listener);
    }
    emit(event, ...args) {
        return super.emit(event, ...args);
    }
}
export { ArtfightClient };
