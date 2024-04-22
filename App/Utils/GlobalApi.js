import { request, gql } from "graphql-request";

const MASTER_URL =
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clurgm703064l07wev8xfi7jw/master";

const getSlider = async () => {
  const query = gql`
    query GetSlider {
      sliders {
        id
        name
        image {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getCategories = async () => {
  const query = gql`
    query GetCategory {
      categories {
        id
        name
        icon {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getBusinessList = async () => {
  const query = gql`
    query GetBusinessList {
      businessLists {
        id
        name
        email
        contactPerson
        category {
          name
        }
        adress
        about
        images {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getBusinessListByCategory = async (category) => {
  const query =
    gql`
    query GetBusinessList {
      businessLists(where: { category: { name: "` +
    category +
    `" } }) {
        id
        name
        email
        contactPerson
        category {
          name
        }
        adress
        about
        images {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const createBooking = async (data) => {
  const mututionquery =
    gql`
    mutation CreateBooking {
      createBooking(
        data: {
          bookingStatus: Booked
          businessList: { connect: { id: "` +
    data.businessId +
    `" } }
          date: "` +
    data.date +
    `"
          time: "` +
    data.time +
    `"
          userEmail: "` +
    data.userEmail +
    `"
          userName: "` +
    data.userName +
    `", note: "` +
    data.note +
    `"
        }
      ) {
        id
      }
      publishManyBookings(to: PUBLISHED){
        count
      }
    }
  `;
  const result = await request(MASTER_URL, mututionquery);
  return result;
};

const getUserBookings = async (userEmail) => {
  const query =
    gql`
    query GetUserBookings {
      bookings(orderBy: publishedAt_DESC, where: { userEmail: "` +
    userEmail +
    `" }) {
        bookingStatus
        date
        time
        userEmail
        userName
        note
        id
        businessList {
          id
          images {
            url
          }
          name
          adress
          contactPerson
          email
          about
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

export default {
  getSlider,
  getCategories,
  getBusinessList,
  getBusinessListByCategory,
  createBooking,
  getUserBookings,
};
