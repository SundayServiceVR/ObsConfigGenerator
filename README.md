# ObsConfigGenerator

## How to use
* NOTE: This will pull data from the current/next event in the web app, so ensure that the lineup information 
  is accurate before running this.
* Install [Deno](https://deno.com/)
* Ensure OBS is closed
* Open a terminal within this project directory and run `deno task run`
* Once it is `Done` you can close the terminal window

## Commands needed to implement
- Single/default command to download any prerecorded sets, generate our scene
  collection, and move them into the OBS folder.
  - Create any appdata folders that are needed
  - Any old scene collections are moved to archives
  - Any old sets are removed, so we should probably keep them in folders by
    event date

- Open the appdata s4vr folder
- Open the expected OBS scene collection folder

## Things we have yet to implement
- Convert google drive direct link
- Convert dropbox link
- YTDLP for youtube
- Predownload prerecords and store them in our appdata
- Build into a binary in GHA and distribute
- Audio Only Sets
- Utilize personal scene (bumper/tech difficulties/etc.) and merge with event scenes

## Nice-to-have
- Mac Support
