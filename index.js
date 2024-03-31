import { Observable, of } from 'rxjs';

/*
 * Any code samples you want to play with can go in this file.
 * Updates will trigger a live reload on http://localhost:1234/
 * after running npm start.
 */
//of('Hello', 'RxJS').subscribe(console.log);

//first we need to declare an observable, which will declare a subscriber function (videos 1 - 3)
const firstObervable$ = new Observable(subscriber => {
  subscriber.next('Hi there');
  subscriber.next('This is the second value');
  subscriber.complete();
});

//now, we create an observer, which can contain 3 callback functions next, error and complete

const firstObserver = {
  next: (val) => console.info('Here we go', val),
  error: (err) => console.error('Something went wrong ', err),
  complete: () => console.log(' 👌 Observer completed')
}

// last, we subscribe the observer to the observable

firstObervable$.subscribe(firstObserver);

//As a variant, we can also pass directly the callback functions to the subscribe method (video 4)

firstObervable$.subscribe(
  (val) => console.info('sucess and passed directly to the subscribe method ', val),
  null, //if we dont need a particular callback function, we can simply pass null
  () => console.log('This was also completed!')
);

// Async observable - here we can see the implementatin of a subscribe and unsubscribe methods

const firstObervableAsync$ = new Observable(subscriber => {
  let count = 0;

  const tInterval = setInterval(() => {
    count += 1;
    subscriber.next(count);
  }, 1000);

  return () => {
    console.info(' canceling the interval ');
    clearInterval(tInterval);
  }
})

const subscribeAsync = firstObervableAsync$.subscribe(firstObserver);
//here we subscribe one more time
const subscribeAsync2 = firstObervableAsync$.subscribe(firstObserver);

// we can also "pack" subscription objects so we can cancel all of them at once, for this, we use the add method that comes with the subscription object
subscribeAsync.add(subscribeAsync2);


setTimeout(() => {
  subscribeAsync.unsubscribe();
}, 5000);