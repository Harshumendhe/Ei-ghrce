export interface TeamMember{_id?:string;name:string;role:string;branch?:string;year?:string;domain?:string;photo?:string;linkedin?:string;instagram?:string}
export interface EventItem{_id?:string;title:string;date:string;location?:string;format?:string;category?:string;summary:string;description?:string;image?:string;status?:string}
export interface Project{_id?:string;name:string;problem:string;team?:string[];tools?:string[];image?:string;demoUrl?:string;githubUrl?:string;category?:string}
export interface GalleryItem{_id?:string;image:string;caption?:string;category?:string}
