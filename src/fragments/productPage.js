import groq from 'groq';
import {CUSTOM_PRODUCT_OPTIONS} from './customProductOptions';
import {IMAGE} from './image';
import {PORTABLE_TEXT} from './portableText';
import {SEO_PRODUCT} from './seoProduct';

export const PRODUCT_PAGE = groq`
  _id,
  "available": !store.isDeleted && store.status == 'active',
  body[]{
    ${PORTABLE_TEXT}
  },
  "customProductOptions": *[_type == 'settings'][0].customProductOptions[title in ^.store.options[].name] {
    ${CUSTOM_PRODUCT_OPTIONS}
  },
  images[] {
    ${IMAGE}
  },
  sections[]{
    _key,
    body[]{
      ${PORTABLE_TEXT}
    },
    title
  },
  seo {
    ${SEO_PRODUCT}
  },
  store,
  "slug": store.slug.current,
`;
