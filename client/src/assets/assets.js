import logo from './logo.svg'
import logo_image_nobg from './logo_image_nobg.png'
import logo_icon from './logo_icon.svg'
import facebook_icon from './facebook_icon.svg'
import instagram_icon from './instagram_icon.svg'
import twitter_icon from './twitter_icon.svg'
import star_icon from './star_icon.svg'
import rating_star from './rating_star.svg'
import sample_img_1 from './sample_img_1.png'
import sample_img_2 from './sample_img_2.png'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import step_icon_1 from './step_icon_1.svg'
import step_icon_2 from './step_icon_2.svg'
import step_icon_3 from './step_icon_3.svg'
import email_icon from './email_icon.svg'
import lock_icon from './lock_icon.svg'
import cross_icon from './cross_icon.svg'
import star_group from './star_group.png'
import credit_star from './credit_star.svg'
import profile_icon from './profile_icon.png'
import heroBg from './heroBg.jpg'
import genedOne from './genedOne.jpg'
import genedTwo from './genedTwo.png'
import genedThree from './genedThree.jpg'
import genedFour from './genedFour.png'
import genedFive from './genedFive.jpg'
import genedSix from './genedSix.png'

export const assets = {
    logo,
    logo_image_nobg,
    logo_icon,
    facebook_icon,
    instagram_icon,
    twitter_icon,
    star_icon,
    rating_star,
    sample_img_1,
    sample_img_2,
    email_icon,
    lock_icon,
    cross_icon,
    star_group,
    credit_star,
    profile_icon,
    heroBg, genedOne, genedTwo, genedThree, genedFour, genedFive, genedSix
}

export const stepsData = [
    {
      title: 'Describe Your Vision',
      description: 'Type a phrase, sentence, or paragraph that describes the image you want to create.',
      icon: step_icon_1,
    },
    {
      title: 'Watch the Magic',
      description: 'Our AI-powered engine will transform your text into a high-quality, unique image in seconds.',
      icon: step_icon_2,
    },
    {
      title: 'Download & Share',
      description: 'Instantly download your creation or share it with the world directly from our platform.',
      icon: step_icon_3,
    },
  ];

export const testimonialsData = [
    {
      name: 'Sofia Martinez',
      location: 'Barcelona, Spain',
      stars: 5,
      text: `Texmage is simply magical. I described a fantasy scene for my book cover and the results looked like they came from a professional illustrator. Highly recommended!`
    },
    {
        name: 'Umer Farooq',
        location: 'Islamabad, Pakistan',
        stars: 4,
        text: `I was impressed with how fast and accurate the AI was. Some details needed slight tweaking, but overall it's an amazing tool for quick visual content creation.`
    },
    {
        name: 'Liam Connor',
        location: 'Dublin, Ireland',
        stars: 5,
        text: `As a marketer, Texmage has helped me save hours on content generation. The quality of images it produces from text prompts is next-level.`
    }
]

export const plans = [
    {
      id: 'Basic',
      price: "10$",
      credits: "100 Credits",
      desc: 'Best for personal use.'
    },
    {
      id: 'Advanced',
      price: "50$",
      credits: "500 Credits",
      desc: 'Best for business use.'
    },
    {
      id: 'Business',
      price: "250$",
      credits: "5000 Credits",
      desc: 'Best for enterprise use.'
    },
  ]