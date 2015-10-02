declare module 'ldapjs' {
	
	
	class Client {
		createClient(url:string):Client;
		bind(dn:string, password:string, callback:(err:any)=> void):void;
		search(base:string, options:any, callback:(err:any, res:any)=>void):void;
		add(dn:string, controls:any, callback:(err:any)=>void):void;
		compare(dn:string, attribute:string, value:string, callback:(err:any, matched:boolean)=>void):void;
		del(dn:string,callback:(err:any)=>void):void;
		exop(name:string, callback:(err:any,value:any,res:any)=>void):void;
		unbind(callback:(err:any)=>void):void;
	}
	
	export = Client;
}