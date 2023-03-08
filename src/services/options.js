const genreOptions = [
    { value: 'house', label: 'house' },
    { value: 'trap', label: 'trap' },
    { value: 'hiphop', label: 'hiphop' },
    { value: 'pop', label: 'pop' },
    { value: 'edm', label: 'edm' },
    { value: 'techno', label: 'techno' },
    { value: 'funk', label: 'funk' },
    { value: 'rnb', label: 'rnb' },
    { value: 'soul', label: 'soul' },
    { value: 'disco', label: 'disco' },
    { value: 'dubstep', label: 'dubstep' },
    { value: 'electro', label: 'electro' },
    { value: 'drumstep', label: 'drumstep' },
    { value: 'downtempo', label: 'downtempo' },
    { value: 'reggaeton', label: 'reggaeton' },
    { value: 'synthwave', label: 'synthwave' },
    { value: 'deep dubstep', label: 'deep dubstep' },
    { value: 'afro house', label: 'afro house' },
    { value: 'amapiano', label: 'amapiano' },
    { value: 'bass', label: 'bass' },
    { value: 'basshouse', label: 'basshouse' },
    {
    value: 'breaks / breakbeat / uk bass',
    label: 'breaks / breakbeat / uk bass'
    },
    { value: 'dance / electro pop', label: 'dance / electro pop' },
    { value: 'deephouse', label: 'deephouse' },
    { value: 'drum & bass', label: 'drum & bass' },
    { value: 'electronica', label: 'electronica' },
    { value: 'funky house', label: 'funky house' },
    { value: 'hard dance / hardcore', label: 'hard dance / hardcore' },
    { value: 'hard techno', label: 'hard techno' },
    { value: 'indie dance', label: 'indie dance' },
    { value: 'jackin house', label: 'jackin house' },
    { value: 'mainstage', label: 'mainstage' },
    { value: 'melodic house', label: 'melodic house' },
    { value: 'minimal / deep tech', label: 'minimal / deep tech' },
    { value: 'progressive house', label: 'progressive house' },
    { value: 'psy-trance', label: 'psy-trance' },
    { value: 'trance', label: 'trance' },
    { value: 'uk garage / bassline', label: 'uk garage / bassline' },
    { value: 'alternative rock', label: 'alternative rock' },
    { value: 'ambient', label: 'ambient' },
    { value: 'classical', label: 'classical' },
    { value: 'country', label: 'country' },
    { value: 'folk', label: 'folk' },
    { value: 'rap', label: 'rap' },
    { value: 'indie', label: 'indie' },
    { value: 'jazz & blues', label: 'jazz & blues' },
    { value: 'latin', label: 'latin' },
    { value: 'metal', label: 'metal' },
    { value: 'rock', label: 'rock' },
    { value: 'triphop', label: 'triphop' },
    { value: 'world', label: 'world' }
]

const keyOptions = [
    { value: 'A', label: 'A' },
    { value: 'A Major', label: 'A Major' },
    { value: 'A Minor', label: 'A Minor' },
    { value: 'A#', label: 'A#' },
    { value: 'A# Major', label: 'A# Major' },
    { value: 'A# Minor', label: 'A# Minor' },
    { value: 'A♭', label: 'A♭' },
    { value: 'A♭ Major', label: 'A♭ Major' },
    { value: 'A♭ Minor', label: 'A♭ Minor' },
    { value: 'B', label: 'B' },
    { value: 'B Major', label: 'B Major' },
    { value: 'B Minor', label: 'B Minor' },
    { value: 'B#', label: 'B#' },
    { value: 'B# Major', label: 'B# Major' },
    { value: 'B# Minor', label: 'B# Minor' },
    { value: 'B♭', label: 'B♭' },
    { value: 'B♭ Major', label: 'B♭ Major' },
    { value: 'B♭ Minor', label: 'B♭ Minor' },
    { value: 'C', label: 'C' },
    { value: 'C Major', label: 'C Major' },
    { value: 'C Minor', label: 'C Minor' },
    { value: 'C#', label: 'C#' },
    { value: 'C# Major', label: 'C# Major' },
    { value: 'C# Minor', label: 'C# Minor' },
    { value: 'C♭', label: 'C♭' },
    { value: 'C♭ Major', label: 'C♭ Major' },
    { value: 'C♭ Minor', label: 'C♭ Minor' },
    { value: 'D', label: 'D' },
    { value: 'D Major', label: 'D Major' },
    { value: 'D Minor', label: 'D Minor' },
    { value: 'D#', label: 'D#' },
    { value: 'D# Major', label: 'D# Major' },
    { value: 'D# Minor', label: 'D# Minor' },
    { value: 'D♭', label: 'D♭' },
    { value: 'D♭ Major', label: 'D♭ Major' },
    { value: 'D♭ Minor', label: 'D♭ Minor' },
    { value: 'E', label: 'E' },
    { value: 'E Major', label: 'E Major' },
    { value: 'E Minor', label: 'E Minor' },
    { value: 'E#', label: 'E#' },
    { value: 'E# Major', label: 'E# Major' },
    { value: 'E# Minor', label: 'E# Minor' },
    { value: 'E♭', label: 'E♭' },
    { value: 'E♭ Major', label: 'E♭ Major' },
    { value: 'E♭ Minor', label: 'E♭ Minor' },
    { value: 'F', label: 'F' },
    { value: 'F Major', label: 'F Major' },
    { value: 'F Minor', label: 'F Minor' },
    { value: 'F#', label: 'F#' },
    { value: 'F# Major', label: 'F# Major' },
    { value: 'F# Minor', label: 'F# Minor' },
    { value: 'F♭', label: 'F♭' },
    { value: 'F♭ Major', label: 'F♭ Major' },
    { value: 'F♭ Minor', label: 'F♭ Minor' },
    { value: 'G', label: 'G' },
    { value: 'G Major', label: 'G Major' },
    { value: 'G Minor', label: 'G Minor' },
    { value: 'G#', label: 'G#' },
    { value: 'G# Major', label: 'G# Major' },
    { value: 'G# Minor', label: 'G# Minor' },
    { value: 'G♭', label: 'G♭' },
    { value: 'G♭ Major', label: 'G♭ Major' },
    { value: 'G♭ Minor', label: 'G♭ Minor' },
]

const instrumentOptions = [
    { value: 'drums', label: 'drums' },
    { value: 'percussion', label: 'percussion' },
    { value: 'fx', label: 'fx' },
    { value: 'synth', label: 'synth' },
    { value: 'vocal', label: 'vocal' },
    { value: 'bass', label: 'bass' },
    { value: 'brass', label: 'brass' },
    { value: 'woodwinds', label: 'woodwinds' },
    { value: 'keys', label: 'keys' },
    { value: 'guitar', label: 'guitar' },
]

const typeOptions = [
    { value: 'one-shot', label: 'one-shot' },
    { value: 'loop', label: 'loop' },
]

export {genreOptions, keyOptions, instrumentOptions, typeOptions }