export interface Launch {
  flight_number:            number;
  mission_name:            string;
  mission_id:              string[];
  upcoming:                boolean;
  launch_year:             string;
  launch_date_unix:        number;
  launch_date_utc:         Date;
  launch_date_local:       Date;
  is_tentative:            boolean;
  tentative_max_precision: unknown;
  tbd:                     boolean;
  launch_window:           number | null;
  rocket:                  Rocket;
  ships:                   string[];
  telemetry:               unknown;
  launch_site:             LaunchSite;
  launch_success:          boolean | null;
  launch_failure_details?: LaunchFailureDetails;
  links:                   Links;
  details:                 null | string;
  static_fire_date_utc:     Date | null;
  static_fire_date_unix:    number | null;
  timeline:                { [key: string]: number | null } | null;
  crew:                    any[] | null;
  last_date_update?:       Date;
  last_ll_launch_date?:    Date | null;
  last_ll_update?:         Date | null;
  last_wiki_launch_date?:  Date;
  last_wiki_revision?:     string;
  last_wiki_update?:       Date;
  launch_date_source?:     LaunchDateSource;
}

export enum LaunchDateSource {
  LaunchLibrary = "launch_library",
  Wiki = "wiki",
}

export interface LaunchFailureDetails {
  time:     number;
  altitude: number | null;
  reason:   string;
}

export interface LaunchSite {
  site_id:        string;
  site_name:      string;
  site_name_long: string;
}

export interface Links {
  mission_patch:       null | string;
  mission_patch_small: null | string;
  reddit_campaign:     null | string;
  reddit_launch:       null | string;
  reddit_recovery:     null | string;
  reddit_media:        null | string;
  presskit:            null | string;
  article_link:        null | string;
  wikipedia:           null | string;
  video_link:          null | string;
  youtube_id:          null | string;
  flickr_images:       string[];
}

export interface Rocket {
  rocket_id:    string;
  rocket_name:  string;
  rocket_type:  string;
  first_stage:   unknown;
  second_stage: unknown;
  fairings:     unknown;
}
