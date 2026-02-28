export interface Emoji {
  char: string;
  name: string;
}

export interface EmojiCategory {
  name: string;
  icon: string;
  emojis: Emoji[];
}

export const EMOJI_CATEGORIES: EmojiCategory[] = [
  {
    name: 'Smileys',
    icon: '😊',
    emojis: [
      { char: '🤗', name: 'hugging face hug warm friendly happy welcome' },
      { char: '😇', name: 'smiling face halo angel innocent good blessed happy sweet' },
      { char: '😈', name: 'smiling face horns devil evil mischief naughty bad villain' },
      { char: '😡', name: 'pouting face angry rage mad furious upset annoyed hate' },
      { char: '😂', name: 'face tears of joy laughing funny lol hilarious happy cry' },
      { char: '🥳', name: 'partying face celebrate celebration birthday party happy fun' },
      { char: '🤩', name: 'star struck amazed wow excited happy thrilled starstruck awesome' },
      { char: '😍', name: 'smiling face heart eyes love adore crush happy infatuated' },
      { char: '🤔', name: 'thinking face hmm pondering wondering doubt curious question' },
      { char: '😬', name: 'grimacing face awkward nervous uncomfortable cringe tense oops' },
    ],
  },
  {
    name: 'Gestures',
    icon: '👋',
    emojis: [
      { char: '👏', name: 'clapping hands applause bravo well done congratulations great' },
      { char: '👌', name: 'ok hand perfect okay fine good alright agree' },
      { char: '🙏', name: 'folded hands please pray thanks thank you grateful beg hope namaste' },
      { char: '👍', name: 'thumbs up like good approve agree yes nice great' },
      { char: '✌️', name: 'victory hand peace v sign two cool' },
      { char: '👋', name: 'waving hand hello hi bye goodbye wave greeting' },
      { char: '🤙', name: 'call me hand shaka hang loose phone' },
      { char: '🤝', name: 'handshake deal agreement meet greeting partnership' },
      { char: '🤟', name: 'love you gesture ily i love you sign' },
      { char: '🤘', name: 'sign of the horns rock metal heavy music cool' },
    ],
  },
  {
    name: 'Animals',
    icon: '🐾',
    emojis: [
      { char: '🐱', name: 'cat face kitten meow pet cute kitty feline' },
      { char: '🐶', name: 'dog face puppy woof pet cute canine loyal' },
      { char: '🐼', name: 'panda face bear cute china black white' },
      { char: '🐸', name: 'frog face toad green jump ribbit' },
      { char: '🦁', name: 'lion face roar king big cat wild safari brave' },
      { char: '🦊', name: 'fox face clever sly cunning orange wild' },
      { char: '🐵', name: 'monkey face see no evil primate ape silly fun' },
      { char: '🐨', name: 'koala bear marsupial australia cute sleepy' },
      { char: '🐭', name: 'mouse face rat small cute tiny squeak' },
      { char: '🐻', name: 'bear face grizzly brown big wild teddy' },
    ],
  },
];

export const ALL_EMOJIS: Emoji[] = EMOJI_CATEGORIES.flatMap(c => c.emojis);
