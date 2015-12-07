declare module 'password-hash' {
	export function generate(password:string, options:any):string;
	export function verify(password:string, hashedPassword:string):boolean;
	export function isHashed(password:string):boolean;
}