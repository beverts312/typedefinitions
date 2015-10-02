declare module 'activedirectory' {
		
		interface User {
			distinguishedName?:string;
			userPrincipalName?:string;
			sAMAccountName?:string;
			mail?:string;
			lockoutTime?:Date;
			whenCreated?:Date;
			pwdLastSet?: Date;
			userAccountControl?: any;
			employeeID?:string;
			sn?:string;
			givenName?:string;
			initials?:string;
			cn?:string;
			displayName?:string; 
			comment?:string;
			description?:string;
		}
	
		interface Group {
			distinguishedName?:string;
			objectCategory?:string;
			cn?:string;
			description?:string;
		}
	
		interface Options {
			url?:string; // a valid LDAP url.
			host?:string; // the host name to connect to (used with port in lieu of url)
			port?:number; //  // the port to connect to (used with hostname in lieu of url)
			secure?: boolean; // indicates if ldaps:// vs ldap:// is used. (used with hostname/port in lieu of url)
			tlsOptions?:string; // additrional tls options (see ldapjs for more information)
			socketPath?:string; // If you're running an LDAP server over a Unix Domain Socket, use this.
			log?:string; //  You can optionally pass in a bunyan instance the client will use to acquire a logger. The client logs all messages at the trace level.
			timeout?:number; //  How long the client should let operations live for before timing out. Default is Infinity.
			idleTimeout?:number; //  How long the client should wait before timing out on TCP connections. Default is up to the OS.
			bindDN?:string; // The DN all connections should be bound as.
			bindCredentials?:string; // The credentials to use with bindDN.
			scope?:string; //  One of base, one, or sub. Defaults to base.
			filter?:string; //  A string version of an LDAP filter (see below), or a programatically constructed Filter object. Defaults to (objectclass=*).
			attributes?:string; //  attributes to select and return (if these are set, the server will return only these attributes). Defaults to the empty set, which means all attributes.
			sizeLimit?:number; //  the maximum number of entries to return. Defaults to 0 (unlimited).
			timeLimit?:number; //  the maximum amount of time the server should take in responding, in seconds. Defaults to 10. Lots of servers will ignore this.
			baseDN?:string; //  The alternative baseDN to use than the one specified in the ctor.
			includeMembership?:string; //  Indicates that a search or find operation should enumerate the group memberships of the specified result types. Supported values are [ 'user', 'group', 'all' ].
			includeDeleted?:string; //  Indicates that results should include tombstoned / deleted items. Please see findDeletedObject for additional notes and caveats.
			entryParser?:Function; // Allows for a custom function to be specified for parsing of the resulting ldap object. Examples include augmenting ldap data with external data from an RDBMs. function onParse(entry, raw, callback) { callback(entry); } If null is returned, the result is excluded.
		}
	
		class ActiveDirectory {
			constructor(config:any);
			
			/* Authenticates the username and password by doing a simple bind with the specified credentials.*/
			authenticate(user: string, password: string, callback:(err:any, result:any)=> void):void;
		
			/*Checks to see if a user is a member of the specified group. This function will also check for group membership inside of a group. Even if a user is not explicity listed as a member of a particular group, if a group that the user is a member of belongs to the group, then this function will return true.*/
			isUserMemberOf(opts:Options, username:string, groupName:string,  callback:(err:any, result:boolean)=> void):void;
	
			/* Checks to see if the specified group exists. */
			groupExists(opts:Options, groupName:string, callback:(err:any, result:boolean)=> void):void;
		
			/* Checks to see if the specified user exists. */
			userExists(opts:Options, username:string,  callback:(err:any, result:boolean)=> void):void;	

			/* For the specified group, retrieve all of the users that belong to the group. If the group contains groups, then the members of those groups are recursively retrieved as well to build a complete list of users that belong to the specified group.*/
			getUsersForGroup(opts:Options, groupName,  callback:(err:any, users:Array<User>)=> void):void;
	
			/* For the specified username, retrieve all of the groups that a user belongs to. If a retrieved group is a member of another group, then that group is recursively retrieved as well to build a complete hierarchy of groups that a user belongs to.*/
			getGroupMembershipForUser(opts:Options, username,  callback:(err:any, groups:Array<Group>)=> void):void;
	
			/* For the specified group, retrieve all of the groups that the group is a member of. If a retrieved group is a member of another group, then that group is recursively retrieved as well to build a complete hierarchy of groups that a user belongs to.*/
			getGroupMembershipForGroup(opts:Options, groupName,  callback:(err:any, groups:Array<Group>)=> void):void;
	
			/* Perform a generic search for the specified LDAP query filter. This function will return both groups and users that match the specified filter. Any results not recognized as a user or group (i.e. computer accounts, etc.) can be found in the 'other' attribute / array of the result.*/
			find(opts: Options,  callback:(err:any, groups:Array<Group>)=> void):void;
	
			/* If tombstoning (recycle bin) is enabled for the Active Directory installation, use findDeletedObjects to retrieve items in the recycle bin.*/
			findDeletedObjects(opts:Options,  callback:(err:any, result:Array<any>)=> void):void;
	
			/* Looks up or finds a username by their sAMAccountName, userPrincipalName, distinguishedName (dn) or custom filter. If found, the returned object contains all of the requested attributes.*/
			findUser(opts:Options, username:string,  callback:(err:any, user:User)=> void):void;
	
			/* Perform a generic search for users that match the specified filter. The default LDAP filter for users is specified as (&(|(objectClass=user)(objectClass=person))(!(objectClass=computer))(!(objectClass=group)))*/
			findUsers(opts:Options,  callback:(err:any, users:Array<User>)=> void):void;
	
			/* Looks up or find a group by common name (CN) which is required to be unique in Active Directory or optionally by the distinguished name. Supports groups with range retrieval specifiers. The following attributes are returned by default for the group:*/
			findGroup(opts:Options, groupName:string,  callback:(err:any, group:Group)=> void):void;
	
			/* Perform a generic search for groups that match the specified filter. The default LDAP filter for groups is specified as (&(objectClass=group)(!(objectClass=computer))(!(objectClass=user))(!(objectClass=person))) */
			findGroups(opts:Options,  callback:(err:any, groups:Array<Group>)=> void):void;
	
			/* Retrieves the root DSE for the specified url. Can be called statically. */
			getRootDSE(url:Options, attributes:any,  callback:(err:any, result:any)=> void):void;
		}
	export = ActiveDirectory;
}