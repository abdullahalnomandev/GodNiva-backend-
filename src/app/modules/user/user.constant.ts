export enum USER_AUTH_PROVIDER {
  LOCAL = 'local',
  GOOGLE = 'google',
  MOBILE = 'mobile',
  FACEBOOK = 'facebook',
}

export enum PROFILE_MODE {
    PRIVATE = 'private',
    PUBLIC = 'public'
}
export const userSearchableField = ['name', 'email'];


export enum ACTIVITY_TYPE {
  POST = 'post',
  VIDEO = 'video',
  PHOTO = 'photo',
  STORY = 'story',
  LIKE = 'like',
  SAVE = 'save'
}

export enum INTEREST_TYPE {
  HIKING_AND_OUTDOORS = 'hiking_and_outdoors',
  COFFEE_AND_BRUNCH = 'coffee_&_brunch',
  ART_AND_MUSEUMS = 'art_and_museums',
  FITNESS = 'fitness',
  BOARD_GAMES = 'board_games',
  FOOD = 'food',
}

export enum MEET_PREFER_TYPE {
  ONE_TO_ONE = 'one_to_one',
  SMALL_GROUP = 'small_group',
  BOTH = 'both',
}

// When are you usually free?
export enum FREE_TIME_TYPE {
  WEEKDAY_EVENINGS = 'weekday_evenings',
  WEEKEND_MORNINGS = 'weekend_mornings',
  FLEXIBLE = 'flexible',
}
// What's your mood is today?
export enum MOOD_TYPE {
  GET_OUT_OF_THE_HOUSE = 'get_out_of_the_house',
  TALK_TO_SOMEONE = 'talk_to_someone',
  DO_SOMETHING_CALM = 'do_something_calm',
  DO_SOMETHING_ACTIVE = 'do_something_active',
  LAUGH_MORE = 'laugh_more',
  TRY_SOMETHING_NEW = 'try_something_new',
  MEET_PEOPLE_IN_MY_LANGUAGE = 'meet_people_in_my_language',
}
export enum PREFERRED_TRANSPORT_TYPE {
  WALKING = 'Walking',
  DRIVING = 'driving',
}

export enum TRANSPORT_MODE_TYPE {
  WALKING = 'Walking',
  DRIVING = 'driving',
}
