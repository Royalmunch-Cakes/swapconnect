export interface Review {
  name: string;
  email: string;
  rating: number;
  review: string;
  date: string | number | Date;
}

export interface ReviewFormState {
  reviews: Review[];
  form: {
    name: string;
    email: string;
    review: string;
  };
  rating: number;
  hover: number | null;
  currentReviewIndex: number;
  setProductTitle: (title: string) => void;
  loadReviews: (title: string) => void;
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  setRating: (rating: number) => void;
  setHover: (hover: number | null) => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  nextReview: () => void;
  prevReview: () => void;
}