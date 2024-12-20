If you notice any missing documentation please reach out.
# `ArtfightClient` (extends [EventEmitter](https://nodejs.org/en/learn/asynchronous-work/the-nodejs-event-emitter "Node.js documentation"))
The client used to connect to Artfight.

## Properties:
- #### scrapper ([ArtfightScrapper](#artfightscrapper))
  The client's scrapper, used to scrape the data from Artfight.
- #### user ([ClientUser](#clientuser-extends-user))
  The user that logged in via the client.
- #### users ([UserManager](#usermanager-extends-manager))
  The manager containing all of Artfight users.
- #### members ([MemberManager](#membermanager-extends-manager))
  The manager containing all of Artfight's members (users who paid to support Artfight).
- #### attacks ([SubmitionManager](#sumbitionmanager-extends-manager))
  The manager containing all of Artfight's attacks.
- #### defenses ([SubmitionManager](#sumbitionmanager-extends-manager))
  The manager containing all of Artfight's defenses.
- ### characters ([CharacterManager](#charactermanager-extends-manager))
  The manager containing all of Artfight's characters.
- ### completes ([Complete](#complete--not-implemented)|[Complete](#complete--not-implemented)[])
  *In development*
  The opposite of partials, defines which returned values are returned whole. (Characters, Comments, Users, Submissions, All)

## Methods:
- ### login()
    - #### params:
        - ##### username ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
          The username which you want to login with to Artfight.
        - ##### password ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
          The user's password.
        - ##### callback ([Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions "Go to developer.mozilla.org"))
          The function that gets called on user login.
        - ##### completes ([Complete](#complete--not-implemented)|[Complete](#complete--not-implemented)[])
          Opposite of partials, determines which elements are returned whole (Characters, Comments, Users, Submissions, All).
    - #### returns: ([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<void>)
      Logs in the user and initializes the client.
    - #### usage:
      ```javascript
      client.login('yourUsername', 'yourPassword', () => {
          console.log('Logged in as:', client.user.username);
      }, Complete.All);
      ```
# `ArtfightScrapper`
*[Internal class, not for public use]*
The scrapper used to connect to Artfight and scrape data.

## Properties:
- #### client ([ArtfightClient](#artfightclient-extends-eventemitter))
  The scrapper's client.
- #### pages ([PageManager](#pagemanager))
  The manager for handling multiple browser pages during scraping.

## Methods:
- ### login()
    - #### params:
        - ##### username ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
          The Artfight username.
        - ##### password ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
          The Artfight password.
    - #### returns: ([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<void>)
      Logs in the user and initializes page management.
    - #### usage:
      ```javascript
      await scrapper.login('yourUsername', 'yourPassword');
      ```

- ### logout()
    - #### returns: ([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<void>)
      Logs out the user and closes the browser.
    - #### usage:
      ```javascript
      await scrapper.logout();
      ```

- ### fetchUserStatus()
    - #### params:
        - ##### username ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
          The name of the user.
    - #### returns: ([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<{lastseen:[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"), joined:[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"), team:[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org")}> )
      The online status of the user.
    - #### usage:
      ```javascript
      const status = await scrapper.fetchUserStatus('username');
      console.log(status);
      ```

- ### fetchUserImage()
    - #### params:
        - ##### username ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
          The name of the user.
    - #### returns: ([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org")>)
      The URL of the user's profile image.
    - #### usage:
      ```javascript
      const imageUrl = await scrapper.fetchUserImage('username');
      console.log(imageUrl);
      ```

- ### fetchCharactersByTag()
    - #### params:
        - ##### tags ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org") | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org")[])
          Tags for character search.
        - ##### limit ([number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number))
          Maximum number of characters to return (default is 10).
    - #### returns: ([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Character](#character)[]>)
      Array of characters matching the specified tags.
    - #### usage:
      ```javascript
      const characters = await scrapper.fetchCharactersByTag(['tag1', 'tag2'], 2);
      console.log(characters);
      ```

- ### fetchUserStatistics()
    - #### params:
        - ##### username ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
          The name of the user.
    - #### returns: ([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<{current:([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org")|[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number))[], overall:[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org")[], achievements:[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org")[][]}>)
      User statistics including current, overall, and achievements.
    - #### usage:
      ```javascript
      const stats = await scrapper.fetchUserStatistics('username');
      console.log(stats);
      ```

- ### fetchUserCharacters()
    - #### params:
        - ##### username ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
          The name of the user.
    - #### returns: ([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Character](#character)[]>)
      Array of characters owned by the user.
    - #### usage:
      ```javascript
      const userCharacters = await scrapper.fetchUserCharacters('username');
      console.log(userCharacters);
      ```

- ### fetchUserCharacter()
    - #### params:
        - ##### link ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
          The URL of the character.
    - #### returns: ([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[Character](#character)>)
      Character details scraped from the provided link.
    - #### usage:
      ```javascript
      const character = await scrapper.fetchUserCharacter('https://artfight.net/character/link');
      console.log(character);
      ```

- ### fetchSubmitions()
    - #### params:
        - ##### username ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
          The name of the user.
        - ##### limit ([number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number))
          Maximum number of submissions to return.
    - #### returns: ([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[Submition](#sumbition)[]>)
      Array of submissions for the specified user.
    - #### usage:
      ```javascript
      const submissions = await scrapper.fetchSubmitions('username', 5);
      console.log(submissions);
      ```

- ### fetchMembers()
    - #### params:
        - ##### limit ([number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number))
          Maximum number of members to return.
    - #### returns: ([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<{username:[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"), lastseen:[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"), points:[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number), battleratio:[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number)}[]>)
      List of Artfight members with their details.
    - #### usage:
      ```javascript
      const members = await scrapper.fetchMembers(10);
      console.log(members);
      ```

- ### fetchRandomUsername()
    - #### returns: ([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org")>)
      A random username from Artfight.
    - #### usage:
      ```javascript
      const randomUsername = await scrapper.fetchRandomUsername();
      console.log(randomUsername);
      ```

- ### fetchRandomCharacter()
    - #### returns: ([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Character](#character)>)
      A random character from Artfight.
    - #### usage:
      ```javascript
      const randomCharacter = await scrapper.fetchRandomCharacter();
      console.log(randomCharacter);
      ```

- ### fetchComment()
  - #### params:
    - ##### page ([Page](https://pptr.dev/api/puppeteer.page))
    The page to scrape the comments off of.
  - #### returns: ([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Comment](#comment)[]>)
# `User`
  An artfight user.
## Properties:
- #### client ([ArtfightClient](#artfightclient-extends-eventemitter))
  The users artfight client.
- #### username ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  The users name.
- #### status ([UserStatus](#userstatus))
  The users status.
- #### attacks ([SubmitionManager](#sumbitionmanager-extends-manager))
  The manager of the attacks made by the user.
- #### defenses ([SubmitionManager](#sumbitionmanager-extends-manager))
  The manager of the defenses made against the user.
- #### characters ([CharacterManager](#charactermanager-extends-manager))
  The manager of the users characters.
- #### statistics ([UserStatistics](#userstatistics))
  The statistics of the user.
- #### avatar ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  The URL to the users avatar.
- #### comments ([Comment](#comment)[])
  The comments made on the users page.
    ```diff
    - Warning: Will return empty array unless the completes: Complete.Comment or Complete.All is enabled.
    ```
# `UserStatus`
  The user's status
## Properties:
- #### lastseen ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  Timestamp of when the user was last seen online.
- #### joined ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  Timestamp of when the user registered for artfight.
- #### team ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  The name of the team that the user is currently in.
# `UserStatistics`
  The user's statistics
## Properties:
- #### overall ([BattleStatistics](#battlestatistics))
  Overall artfight statistics.
- #### current ([BattleStatistics](#battlestatistics))
  Current artfight statistics (from the current/most recent event).
- #### achivement ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org")[][])
  The user's achivements
# `ClientUser` (extends [User](#user))
  *In development*
  The user that logged in via the client.
## Methods:
- ### init()
  - #### returns ([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[User](#user)>)
  *[Internal method, not for public use]* Initializes the user.
# `UserManager` (extends [Manager](#manager))
  The manager of artfight users.
## Properties:
- #### client ([ArtfightClient](#artfightclient-extends-eventemitter))
  The client used to log into artfight
## Methods:
- ### fetch()
  - #### params:
    - ##### username ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
      The username of the user you want to fetch.
  - #### returns  ([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[User](#user)>)
    Fetches the user with the provided username.
  - #### usage:
    ````javascript
    const user = await client.users.fetch("username");
    console.log(user);
    ````
- ### random()
  - #### returns  ([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[User](#user)>)
    Fetches a random user.
  - #### usage:
    ````javascript
    const user = await client.users.random();
    console.log(user)
    ````
# `MemberManager` (extends [Manager](#manager))
  The manager of artfight members.
## Properties:
- #### client ([ArtfightClient](#artfightclient-extends-eventemitter))
  The client used to log into artfight
## Methods:
- ### fetch()
  - #### params:
    - ##### limit ([number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number))
      Maxium amount of members returned.
  - #### returns ([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[Member](#member)[]>)
    Fetches artfight members up to a provided limit.
  - #### usage:
    ````javascript
    const members = await client.members.fetch(10);
    console.log(members);
    ````
# `Member`
  The member of artfight (a user who supports artfight financially).
## Properties:
- #### username ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  The username of the member.
- #### lastseen ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  Timestamp of when the member was last seen online.
- #### points ([number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number))
  The number of points aquired by the member in his last event.
- #### battleratio ([number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number))
  number between `0` and `100` which shows the response rate of the member to attacks.
# `SumbitionManager` (extends [Manager](#manager))
  *In development*
  The manager of artfights submitions (attacks and defenses).
## Properties:
- #### type (["attack"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org")|["defense"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  The managers type, determines whether it stores attacks or defenses.
# `CharacterManager` (extends [Manager](#manager))
  The manager of artfights characters
## Methods:
- ### fetch()
  - #### params:
    - ##### username ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
      The username of the user whose characters you want to fetch
  - #### returns ([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Character](#character)[]>)
  Fetches all characters owned by the user with the provided username.
  - #### usage:
    ````javascript
    const characters = await client.characters.fetch("username");
    console.log(characters)
    ````
- ### random()
  - #### returns ([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Character](#character)[]>)
  Fetches a random character.
  - #### usage:
    ````javascript
    const character = await client.characters.random();
    console.log(character)
    ````
- ### tagSearch()
  - #### params:
    - ##### tags ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"),[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org")[])
      Tags to filter the characters by.
    - ##### limit ([number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number))
      Maximum amount of characters returned.
  - #### returns ([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Character](#character)[]>)
  Returns an array of characters with the given tags and limited in length by the given limit.
# `Character`
  An artfight character.
## Properties:
- #### id ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  Identification index of the character.
- #### name ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  Name of the character.
- #### created ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  Timestamp of when the character got uploaded to artfight.
- #### images ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org")[])
  List of URLs to images of the character.
- #### description ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  Description of the character
- #### permissions ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  Permissions of the character (what the owner allows to do with the character).
- #### attacks ([Submition](#sumbition)[])
  List of attacks made on the character.
- #### information ([CharacterInformation](#characterinformation))
  Information abount the character (who owns it/who designed it).
- #### tags ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org")[])
  Tags the character is associated with.
- #### comments ([Comment](#comment)[])
  Comments made on the character.
  ```diff
  - Warning: Will return empty array unless the completes: Complete.Comment or Complete.All is enabled.
  ```
## Methods:
- ### link()
  - #### returns ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  The URL to the characters page on artfight.
# `CharacterInformation`
  Information about a character.
## Properties:
- #### owner ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  Owner of the character.
- #### designer ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  Designer of the character.
- #### *moreinfo* ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org")|[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined))
  Link to an external site for more character information.
# `Complete`
  *__!Not implemented!__*
  The opposite of partials, defines which returned values are returned whole. (Characters, Comments, Users, Submissions, All)
## Values:
- #### Character `(1)`
  When fetching characters, fetch all the possible data.
- #### Comment `(2)`
  When fetching comments, fetch all the possible data.
- #### User `(3)`
  When fetching users, fetch all the possible data.
- #### Submitions `(4)`
  When fetching submitions, fetch all the possible data.
- #### All `(5)`
  When fetching everything, fetch all the possible data.
# `PageManager`
A manager for the scappers pages
## Properties:
- #### length ([number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number))
  The amount of pages managed by the page manager.
## Methods:
- ### init()
  - #### params:
    - ##### browser ([Browser](https://pptr.dev/api/puppeteer.browser/))
    The browser to create the pages in.
  - #### returns ([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<void>)
    Initializes the page manager.
# `Sumbition`
An artfight submition.
## Properties:
- #### information ([SubmitionInformation](#submitioninformation))
  Information about the submition.
- #### statistics ([SubmitionStatistics](#submitionstatistics))
  The statistics of the submition.
- #### revenge ({previous?:[Revenge](#revenge)|[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined), next?:[Revenge](#revenge)|[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)})
  Submition's revenge information.
- #### timestamp ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  Timestamp of when the submition got posted.
- #### polished ([Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean))
  Whether the submition is marked polished.
- #### friendlyfire ([Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean))
  Whether the submition was sent from someone on the same team.
- #### comments ([Comment](#comment)[])
  Comments made on the submition.
    ```diff
    - Warning: Will return empty array unless the completes: Complete.Comment or Complete.All is enabled.
    ```
# `SubmitionInformation`
  Information about a submition.
## Properties:
  - #### from ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
    The username of the user that posted the submiton.
  - #### to ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
    The username of the user that the submition was made for.
  - #### team ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
    The name of the team of the user posting.
  - #### characters ([SubmitonCharacter](#submitioncharacter)[])
    List of characters in the submition.
# `SubmitionCharacter`
  A character in the submition.
## Properties:
- #### type ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  The state of the character in the submition (Head shot/Fullbody, ect.)
- #### link ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  Link to the character's page.
- #### image ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  Not sure, added it really long ago and can't figure it out.
# `SubmitionStatistics`
*In development*
Statistics of a submition.
## Properties:
- #### points ([number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number))
  number of points awarded for the submition.
- #### character_count ([number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number))
  Amount of characters in the submition.
- #### type ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  The type of submition (Drawing/Animation, ect.)
- #### finish ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  The point of finish of the drawing
- #### color ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  The point of coloring of the drawing
- #### shading ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  The point of shading of the drawing
- #### background ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  The state of background of the drawing
# `Comment`
*__!Partially implemented!__*
A user's comment.
## Properties:
- #### author ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  The author of the comment
- #### content ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  The content of the comment
- #### posted ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  The timestamp of when the comment was posted
# BattleStatistics
  The battle statistics of a user.
## Properties:
- #### ratio ([number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number))
  The defense to attack ratio of the user.
- #### points ([number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number))
  Amount of points gained by the user.
- #### attacks ([number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number))
  Amount of attacks submited by the user.
- #### friendlyfire ([number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number))
  Amount of friendly fire attacks submited by the user.
- #### defenses ([number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number))
  Amount of defenses submited by the user.
# `Manager`
A cache manager.
## Properties:
- #### cache ([Cache](#cache-extends-nodecache))
  The managers cache.
# `Cache` (extends [NodeCache](https://www.npmjs.com/package/node-cache#examples))
Storage for fetched data.
## Properties:
- #### size ([number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number))
  Size of the cache.
## Methods:
- ### values()
  - #### returns ([KeyValuePair](https://www.google.com/search?q=key+value+pair))
  Returns all of the cache's values along with the coresponding keys.
# `Revenge`
A revenge to a submition.
## Properties:
- #### link ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  Link to the revenge submition.
- #### title ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  Title of the revenge submition.
- #### level ([number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number))
  Level of the revenge chain.
- #### image ([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string "Go to developer.mozilla.org"))
  Link to the revenge's image.