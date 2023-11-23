export class Student {
    id!: number;
    firstName: string = '';
    lastName: string = '';
    streetAddress: string = '';
    email: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';
    telephone: string = '';
    date: string = '';
    likedOptions: { [key: string]: boolean } = {
        'Students': false,
        'Location': false,
        'Campus': false,
        'Atmosphere': false,
        'Dorms': false,
        'Sports': false
    };
    likelihoodToRecommend: string = '';
    sourceOfInterest: string = 'Friends'; 
    selectedOption: string = 'Friends'; 
    
    sourceOfInterestOptions: Record<string, string> = {
        friends: 'Friends',
        relatives: 'Relatives',
        internet: 'Internet',
        television: 'Television',
        // Add more options as needed
    };
    comments: string = '';



    // Ensure that this function is placed inside the class
    getSelectedLikedOptions(): string[] {
        return Object.keys(this.likedOptions).filter(key => this.likedOptions[key]);
    }

   
}
