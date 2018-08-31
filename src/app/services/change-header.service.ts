import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class ChangeHeaderService {
    private subject = new Subject<any>();
    value :any = {};
    changeHeader(user: any) {
        console.log('user >>>>>>>..', user)
        this.subject.next({ currentUser: user });
    }

    getUser(): Observable<any> {
        return this.subject.asObservable();
    }

    private data = new Subject<any>();
    setData(passedObject: any) {
        this.data.next({ passedObject: passedObject });
    }

    getData(): Observable<any> {
        return this.data.asObservable();
    }
}