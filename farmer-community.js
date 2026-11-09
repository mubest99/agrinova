
(function () {
  "use strict";

  // =========================================================
  // 1. SUPABASE CONNECTION
  // =========================================================

  const SUPABASE_URL = "https://iqxfusbouchrapfxonxe.supabase.co";

  // Paste your Supabase anon/publicable key here.
  // Do NOT use the service_role key.
  const SUPABASE_KEY = "sb_publishable_rdYNi7mVezWsX-8xAX5kfg_zZv8Ftnv";

  const KEY_PLACEHOLDER =
    "PASTE_YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY_HERE";

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  let db = null;
  let currentUser = null;
  let currentProfile = null;
  let currentView = "feed";
  let currentPage = 0;
  let loading = false;
  let selectedFiles = [];
  const PAGE_SIZE = 10;

  // =========================================================
  // 2. LANGUAGE TRANSLATIONS
  // =========================================================

  const translations = {
    en: {
      dashboard: "Dashboard",
      feed: "News Feed",
      videos: "Videos",
      following: "Following",
      messages: "Messages",
      requests: "Message Requests",
      marketplace: "Marketplace",
      shareSomething: "Share something with the farming community...",
      photo: "Photo",
      video: "Video",
      poll: "Poll",
      communityFeed: "Community Feed",
      connectFarmers: "Connect, share knowledge and grow together.",
      recent: "Most Recent",
      popular: "Popular",
      loading: "Loading community posts...",
      loadMore: "Load More",
      communityGuidelines: "Community Guidelines",
      guidelineOne: "Share useful farming knowledge.",
      guidelineTwo: "Respect other farmers.",
      guidelineThree: "Post accurate information.",
      guidelineFour: "Report harmful content.",
      growBusiness: "Grow Your Farm Business",
      marketplaceDescription: "Discover agricultural products and connect with buyers.",
      visitMarketplace: "Visit Marketplace",
      createPost: "Create a Post",
      messageRequests: "Message Requests"
    },
    am: {
      dashboard: "ዳሽቦርድ",
      feed: "የዜና ማስታወቂያ",
      videos: "ቪዲዮዎች",
      following: "የምከተላቸው",
      messages: "መልዕክቶች",
      requests: "የመልዕክት ጥያቄዎች",
      marketplace: "ገበያ",
      shareSomething: "ከገበሬዎች ማህበረሰብ ጋር ያጋሩ...",
      photo: "ፎቶ",
      video: "ቪዲዮ",
      poll: "የድምጽ መስጫ",
      communityFeed: "የማህበረሰብ ምግብ",
      connectFarmers: "ይገናኙ፣ እውቀት ያጋሩ እና አብረው ያድጉ።",
      recent: "በቅርብ ጊዜ",
      popular: "ተወዳጅ",
      loading: "ልጥፎች በመጫን ላይ...",
      loadMore: "ተጨማሪ ጫን",
      communityGuidelines: "የማህበረሰብ መመሪያዎች",
      guidelineOne: "ጠቃሚ የእርሻ እውቀት ያጋሩ።",
      guidelineTwo: "ሌሎችን ገበሬዎች ያክብሩ።",
      guidelineThree: "ትክክለኛ መረጃ ይለጥፉ።",
      guidelineFour: "ጎጂ ይዘትን ያሳውቁ።",
      growBusiness: "የእርሻ ንግድዎን ያሳድጉ",
      marketplaceDescription: "የግብርና ምርቶችን ያግኙ።",
      visitMarketplace: "ገበያውን ይጎብኙ",
      createPost: "ልጥፍ ይፍጠሩ",
      messageRequests: "የመልዕክት ጥያቄዎች"
    },
    ti: {
      dashboard: "ዳሽቦርድ",
      feed: "ዜና",
      videos: "ቪድዮታት",
      following: "ዝከተልዎም",
      messages: "መልእኽትታት",
      requests: "ሕቶታት መልእኽቲ",
      marketplace: "ዕዳጋ",
      shareSomething: "ምስ ማሕበረሰብ ሓረስቶት ኣካፍሉ...",
      photo: "ስእሊ",
      video: "ቪድዮ",
      poll: "ሕቶ ድምጺ",
      communityFeed: "ዜና ማሕበረሰብ",
      connectFarmers: "ተራኸቡ፣ ፍልጠት ኣካፍሉ።",
      recent: "ናይ ቀረባ",
      popular: "ተፈታዊ",
      loading: "ይጽዕን ኣሎ...",
      loadMore: "ተወሳኺ ኣምጽእ",
      communityGuidelines: "መምርሒታት ማሕበረሰብ",
      guidelineOne: "ጠቓሚ ፍልጠት ሕርሻ ኣካፍሉ።",
      guidelineTwo: "ካልኦት ሓረስቶት ኣኽብሩ።",
      guidelineThree: "ትኽክለኛ ሓበሬታ ለጥፉ።",
      guidelineFour: "ጎዳኢ ትሕዝቶ ሓብሩ።",
      growBusiness: "ንግዲ ሕርሻኹም ኣስፍሑ",
      marketplaceDescription: "ፍርያት ሕርሻ ርኸቡ።",
      visitMarketplace: "ዕዳጋ ተመልከቱ",
      createPost: "ልጥፍ ፍጠሩ",
      messageRequests: "ሕቶታት መልእኽቲ"
    },
    om: {
      dashboard: "Daashboordii",
      feed: "Oduu",
      videos: "Viidiyoo",
      following: "Kan hordofu",
      messages: "Ergaawwan",
      requests: "Gaaffii ergaa",
      marketplace: "Gabaa",
      shareSomething: "Hawaasa qonnaan bultootaa waliin qoodaa...",
      photo: "Suuraa",
      video: "Viidiyoo",
      poll: "Filannoo",
      communityFeed: "Oduu Hawaasaa",
      connectFarmers: "Wal qunnamaa, beekumsa qoodaa, waliin guddadhaa.",
      recent: "Kan dhihoo",
      popular: "Jaallatamaa",
      loading: "Maxxansa fe'aa jira...",
      loadMore: "Dabalata fe'i",
      communityGuidelines: "Qajeelfama Hawaasaa",
      guidelineOne: "Beekumsa qonnaa faayidaa qabu qoodaa.",
      guidelineTwo: "Qonnaan bultoota biroo kabajaa.",
      guidelineThree: "Oduu sirrii maxxansaa.",
      guidelineFour: "Wantoota miidhaa qaban gabaasaa.",
      growBusiness: "Daldala Qonnaa Guddisi",
      marketplaceDescription: "Oomishaalee qonnaa argadhaa.",
      visitMarketplace: "Gabaatti daawwadhaa",
      createPost: "Maxxansa Uumi",
      messageRequests: "Gaaffii Ergaa"
    },
    so: {
      dashboard: "Bogga Guud",
      feed: "Wararka",
      videos: "Fiidiyowyo",
      following: "Kuwa aan raaco",
      messages: "Farriimaha",
      requests: "Codsiyada farriimaha",
      marketplace: "Suuqa",
      shareSomething: "Wax la wadaag bulshada beeraleyda...",
      photo: "Sawir",
      video: "Fiidiyow",
      poll: "Codbixin",
      communityFeed: "Wararka Bulshada",
      connectFarmers: "Isku xirma, aqoonta wadaaga, oo wada kora.",
      recent: "Kuwa ugu dambeeyay",
      popular: "Kuwa caanka ah",
      loading: "Qoraallada waa la soo rarayaa...",
      loadMore: "Kuwa kale soo rar",
      communityGuidelines: "Xeerarka Bulshada",
      guidelineOne: "Wadaag aqoon beeraha waxtar leh.",
      guidelineTwo: "Ixtiraam beeraleyda kale.",
      guidelineThree: "Daabac xog sax ah.",
      guidelineFour: "Soo sheeg waxyaabaha waxyeellada leh.",
      growBusiness: "Kobci Ganacsigaaga Beeraha",
      marketplaceDescription: "Hel alaabta beeraha oo la xiriir iibsadayaasha.",
      visitMarketplace: "Booqo Suuqa",
      createPost: "Samee Qoraal",
      messageRequests: "Codsiyada Farriimaha"
    }
  };

  function translatePage(lang) {
    const dictionary = translations[lang] || translations.en;

    $$("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (dictionary[key]) element.textContent = dictionary[key];
    });

    const labels = {
      en: "English",
      am: "አማርኛ",
      ti: "ትግርኛ",
      om: "Afaan Oromo",
      so: "Af Soomaali"
    };

    if ($("#languageLabel")) {
      $("#languageLabel").textContent = labels[lang] || "English";
    }

    document.documentElement.lang = lang;
  }

  // =========================================================
  // 3. GENERAL HELPERS
  // =========================================================

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]);
  }

  function toast(message) {
    const element = $("#toast");
    if (!element) {
      alert(message);
      return;
    }

    element.textContent = message;
    element.classList.add("show");

    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => {
      element.classList.remove("show");
    }, 3500);
  }

  function showError(context, error) {
    console.error(context, error);
    toast(context + ": " + (error?.message || "Unknown error"));
  }

  function openModal(id) {
    document.getElementById(id)?.classList.remove("hidden");
  }

  function closeModal(id) {
    document.getElementById(id)?.classList.add("hidden");
  }

  function formatDate(value) {
    if (!value) return "";

    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(new Date(value));
  }

  function getAvatarHTML(profile, small = false) {
    const name = profile?.display_name || "Farmer";
    const avatar = profile?.avatar_url;

    return `
      <div class="profile-avatar ${small ? "small" : ""}">
        ${avatar
          ? `<img src="${escapeHTML(avatar)}" alt="">`
          : escapeHTML(name.charAt(0).toUpperCase())}
      </div>
    `;
  }

  // =========================================================
  // 4. AUTHENTICATION AND FARMER PROFILE
  // =========================================================

  async function loadCurrentUser() {
    const { data, error } = await db.auth.getUser();

    if (error) throw error;

    if (!data.user) {
      throw new Error(
        "No signed-in user found. Sign in through your AgriNova farmer account first."
      );
    }

    currentUser = data.user;

    const { data: profile, error: profileError } = await db
      .from("community_profiles")
      .select("id, display_name, username, avatar_url, bio, region, city")
      .eq("id", currentUser.id)
      .maybeSingle();

    if (profileError) throw profileError;

    // The SQL trigger creates this profile for new users.
    // This fallback also repairs a missing profile for an existing user.
    if (!profile) {
      const displayName =
        currentUser.user_metadata?.full_name ||
        currentUser.user_metadata?.name ||
        currentUser.email?.split("@")[0] ||
        "Farmer";

      const { data: created, error: createError } = await db
        .from("community_profiles")
        .upsert({
          id: currentUser.id,
          display_name: displayName,
          avatar_url: currentUser.user_metadata?.avatar_url || null
        })
        .select()
        .single();

      if (createError) throw createError;
      currentProfile = created;
    } else {
      currentProfile = profile;
    }

    const name = currentProfile.display_name || "Farmer";

    if ($("#currentUserName")) {
      $("#currentUserName").textContent = name;
    }

    if ($("#currentUserRegion")) {
      $("#currentUserRegion").textContent =
        [currentProfile.region, currentProfile.city]
          .filter(Boolean)
          .join(", ") || "AgriNova Farmer";
    }

    if ($("#currentUserAvatar")) {
      $("#currentUserAvatar").outerHTML =
        getAvatarHTML(currentProfile).replace(
          'class="profile-avatar"',
          'class="profile-avatar" id="currentUserAvatar"'
        );
    }

    if ($("#composerAvatar")) {
      $("#composerAvatar").outerHTML =
        getAvatarHTML(currentProfile, true).replace(
          'class="profile-avatar small"',
          'class="profile-avatar small" id="composerAvatar"'
        );
    }

    return true;
  }

  // =========================================================
  // 5. FETCH PROFILE DATA FOR POSTS
  // =========================================================

  async function attachProfiles(posts) {
    const ids = [...new Set(posts.map((post) => post.farmer_id))];

    if (!ids.length) return posts;

    const { data: profiles, error } = await db
      .from("community_profiles")
      .select("id, display_name, username, avatar_url, region, city")
      .in("id", ids);

    if (error) throw error;

    const profileMap = new Map(
      (profiles || []).map((profile) => [profile.id, profile])
    );

    return posts.map((post) => ({
      ...post,
      author: profileMap.get(post.farmer_id) || {
        display_name: "Farmer"
      }
    }));
  }

  // =========================================================
  // 6. FETCH MEDIA URLS FROM STORAGE PATHS
  // =========================================================

  function mediaPublicURL(storagePath) {
    if (!storagePath) return "";

    const { data } = db.storage
      .from("community-media")
      .getPublicUrl(storagePath);

    return data?.publicUrl || "";
  }

  // =========================================================
  // 7. LOAD COMMUNITY POSTS
  // =========================================================

  
  // =========================================================
  // 7. LOAD COMMUNITY POSTS — CORRECTED
  // Compatible with the supplied AgriNova SQL schema
  // =========================================================

  async function loadPosts(reset = false) {
    if (!db || !currentUser || loading) return;

    const feed = $("#feedContainer");
    const loadMore = $("#loadMoreButton");

    if (!feed) {
      console.error("Missing HTML element: #feedContainer");
      return;
    }

    if (reset) {
      currentPage = 0;
      feed.innerHTML = "";
    }

    loading = true;

    if (currentPage === 0) {
      feed.innerHTML =
        '<div class="loading-state">Loading community posts...</div>';
    }

    try {
      let query = db
        .from("community_posts")
        .select("id, farmer_id, post_type, content, visibility, created_at, updated_at")
        .order("created_at", { ascending: false })
        .range(
          currentPage * PAGE_SIZE,
          currentPage * PAGE_SIZE + PAGE_SIZE - 1
        );

      // VIDEO VIEW
      if (currentView === "videos") {
        query = query.eq("post_type", "video");
      }

      // FOLLOWING VIEW
      if (currentView === "following") {
        const { data: follows, error: followError } = await db
          .from("community_follows")
          .select("following_id")
          .eq("follower_id", currentUser.id);

        if (followError) throw followError;

        const ids = (follows || []).map(row => row.following_id);

        if (!ids.length) {
          feed.innerHTML =
            '<div class="empty-state">You are not following any farmers yet.</div>';

          loadMore?.classList.add("hidden");
          return;
        }

        query = query.in("farmer_id", ids);
      }

      // FETCH POSTS
      const { data: posts, error: postsError } = await query;

      if (postsError) throw postsError;

      if (reset) feed.innerHTML = "";

      if (!posts || posts.length === 0) {
        if (currentPage === 0) {
          feed.innerHTML =
            '<div class="empty-state">No posts found. Be the first farmer to share something!</div>';
        }

        loadMore?.classList.add("hidden");
        return;
      }

      // FETCH AUTHOR PROFILES
      const enrichedPosts = await attachProfiles(posts);
      const postIds = enrichedPosts.map(post => post.id);

      // FETCH MEDIA, POLLS AND LIKES
      // IMPORTANT: Do not use the undeclared
      // pollsResultPlaceholder variable from the old code.
      const [
        mediaResult,
        pollsResult,
        likesResult
      ] = await Promise.all([
        db
          .from("community_post_media")
          .select("id, post_id, farmer_id, storage_path, media_type, thumbnail_path, caption, display_order")
          .in("post_id", postIds)
          .order("display_order", { ascending: true }),

        db
          .from("community_polls")
          .select("id, post_id, question, expires_at, created_at")
          .in("post_id", postIds),

        db
          .from("community_likes")
          .select("post_id, farmer_id")
          .in("post_id", postIds)
      ]);

      if (mediaResult.error) throw mediaResult.error;
      if (pollsResult.error) throw pollsResult.error;
      if (likesResult.error) throw likesResult.error;

      // FETCH POLL OPTIONS AND VOTES
      const pollIds = (pollsResult.data || []).map(poll => poll.id);

      let options = [];
      let votes = [];

      if (pollIds.length > 0) {
        const [
          optionsResult,
          votesResult
        ] = await Promise.all([
          db
            .from("community_poll_options")
            .select("id, poll_id, option_text, display_order")
            .in("poll_id", pollIds)
            .order("display_order", { ascending: true }),

          db
            .from("community_poll_votes")
            .select("poll_id, option_id, farmer_id")
            .in("poll_id", pollIds)
        ]);

        if (optionsResult.error) throw optionsResult.error;
        if (votesResult.error) throw votesResult.error;

        options = optionsResult.data || [];
        votes = votesResult.data || [];
      }

      // GROUP MEDIA BY POST
      const mediaByPost = new Map();

      (mediaResult.data || []).forEach(item => {
        if (!mediaByPost.has(item.post_id)) {
          mediaByPost.set(item.post_id, []);
        }

        mediaByPost.get(item.post_id).push(item);
      });

      // GROUP POLLS BY POST
      const pollByPost = new Map();

      (pollsResult.data || []).forEach(poll => {
        poll.options = options.filter(
          option => option.poll_id === poll.id
        );

        poll.votes = votes.filter(
          vote => vote.poll_id === poll.id
        );

        pollByPost.set(poll.post_id, poll);
      });

      // GROUP LIKES BY POST
      const likesByPost = new Map();

      (likesResult.data || []).forEach(like => {
        if (!likesByPost.has(like.post_id)) {
          likesByPost.set(like.post_id, []);
        }

        likesByPost.get(like.post_id).push(like);
      });

      // RENDER POSTS
      enrichedPosts.forEach(post => {
        post.media = mediaByPost.get(post.id) || [];
        post.poll = pollByPost.get(post.id) || null;
        post.likes = likesByPost.get(post.id) || [];

        renderPost(post);
      });

      currentPage++;

      loadMore?.classList.toggle(
        "hidden",
        posts.length < PAGE_SIZE
      );

    } catch (error) {
      console.error("Community feed loading error:", error);

      feed.innerHTML = `
        <div class="empty-state">
          <strong>Could not load community posts.</strong>
          <p>${escapeHTML(error.message || "Unknown error")}</p>
          <button type="button" id="retryCommunityFeed">
            Try Again
          </button>
        </div>
      `;

      loadMore?.classList.add("hidden");

    } finally {
      loading = false;
    }
  }


  // =========================================================
  // 8. RENDER POSTS
  // =========================================================

  function renderPost(post) {
    const author = post.author || {};
    const name = author.display_name || "Farmer";
    const media = post.media || [];
    const poll = post.poll;
    const likes = post.likes || [];
    const liked = likes.some((like) => like.farmer_id === currentUser.id);

    const mediaHTML = media.map((item) => {
      const url = mediaPublicURL(item.storage_path);
      if (!url) return "";

      if (item.media_type === "video") {
        return `<video controls preload="metadata" src="${escapeHTML(url)}"></video>`;
      }

      return `<img src="${escapeHTML(url)}" alt="Farmer post" loading="lazy">`;
    }).join("");

    const card = document.createElement("article");
    card.className = "post-card";
    card.dataset.postId = post.id;

    card.innerHTML = `
      <div class="post-header">
        ${getAvatarHTML(author)}
        <div class="post-author">
          <h3>${escapeHTML(name)}</h3>
          <p>${escapeHTML(author.region || author.city || "AgriNova Farmer")}
          · ${escapeHTML(formatDate(post.created_at))}</p>
        </div>
        <button class="icon-button report-post"
          data-post-id="${escapeHTML(post.id)}"
          type="button" title="Report post">
          <i class="fa-solid fa-flag"></i>
        </button>
      </div>

      ${post.content
        ? `<div class="post-content">${escapeHTML(post.content)}</div>`
        : ""}

      ${mediaHTML ? `<div class="post-media">${mediaHTML}</div>` : ""}

      ${poll ? renderPoll(poll) : ""}

      <div class="post-actions">
        <button class="like-post ${liked ? "liked" : ""}"
          data-post-id="${escapeHTML(post.id)}" type="button">
          <i class="${liked ? "fa-solid" : "fa-regular"} fa-heart"></i>
          ${liked ? "Liked" : "Like"} (${likes.length})
        </button>

        <button class="toggle-comments" type="button">
          <i class="fa-regular fa-comment"></i> Comment
        </button>

        <button class="share-post"
          data-post-id="${escapeHTML(post.id)}" type="button">
          <i class="fa-solid fa-share"></i> Share
        </button>
      </div>

      <div class="comment-area hidden">
        <div class="comment-list"></div>
        <form class="comment-form">
          <input type="text" name="comment"
            placeholder="Write a comment..." required>
          <button type="submit">Send</button>
        </form>
      </div>
    `;

    $("#feedContainer").appendChild(card);
  }

  // =========================================================
  // 9. POLLS
  // =========================================================

  function renderPoll(poll) {
    const options = poll.options || [];
    const votes = poll.votes || [];
    const totalVotes = votes.length;
    const alreadyVoted = votes.some(
      (vote) => vote.farmer_id === currentUser.id
    );

    return `
      <div class="poll-card" data-poll-id="${escapeHTML(poll.id)}">
        <h4>${escapeHTML(poll.question)}</h4>

        ${options.map((option) => {
          const count = votes.filter(
            (vote) => vote.option_id === option.id
          ).length;

          const percentage = totalVotes
            ? Math.round((count / totalVotes) * 100)
            : 0;

          return `
            <label class="poll-option-row">
              <input type="radio"
                name="poll-${escapeHTML(poll.id)}"
                value="${escapeHTML(option.id)}"
                ${alreadyVoted ? "disabled" : ""}>
              <span>${escapeHTML(option.option_text)}</span>
              ${alreadyVoted
                ? `<span>${percentage}% (${count})</span>`
                : ""}
            </label>
          `;
        }).join("")}

        <button class="vote-poll secondary-button"
          type="button"
          data-poll-id="${escapeHTML(poll.id)}"
          ${alreadyVoted ? "disabled" : ""}>
          ${alreadyVoted ? "Voted" : "Vote"}
        </button>

        <small>${totalVotes} vote(s)</small>
      </div>
    `;
  }

  async function votePoll(button) {
    const pollId = button.dataset.pollId;
    const card = button.closest(".poll-card");
    const selected = card.querySelector('input[type="radio"]:checked');

    if (!selected) {
      toast("Please select an option.");
      return;
    }

    button.disabled = true;

    const { error } = await db
      .from("community_poll_votes")
      .insert({
        poll_id: pollId,
        option_id: selected.value,
        farmer_id: currentUser.id
      });

    if (error) {
      button.disabled = false;
      showError("Could not record vote", error);
      return;
    }

    toast("Your vote has been recorded.");
    await loadPosts(true);
  }

  // =========================================================
  // 10. CREATE POST MODAL
  // =========================================================

  function resetComposer() {
    $("#postText").value = "";
    $("#pollQuestion").value = "";
    $("#pollFields").classList.add("hidden");
    $("#mediaPreview").innerHTML = "";
    $("#mediaInput").value = "";
    $$(".poll-option").forEach((input) => input.remove());
    selectedFiles = [];
  }

  function showComposer(type = "post") {
    resetComposer();

    if (type === "poll") {
      $("#pollFields").classList.remove("hidden");
    }

    if (type === "photo") {
      $("#mediaInput").accept = "image/*";
    } else if (type === "video") {
      $("#mediaInput").accept = "video/*";
    } else {
      $("#mediaInput").accept = "image/*,video/*";
    }

    openModal("composerModal");

    if (type === "photo" || type === "video") {
      $("#mediaInput").click();
    }
  }

  function previewFiles() {
    const preview = $("#mediaPreview");
    preview.innerHTML = "";

    selectedFiles.forEach((file) => {
      const url = URL.createObjectURL(file);
      const element = document.createElement(
        file.type.startsWith("video/") ? "video" : "img"
      );

      element.src = url;

      if (element.tagName === "VIDEO") {
        element.controls = true;
      }

      preview.appendChild(element);
    });
  }

  // =========================================================
  // 11. UPLOAD MEDIA TO YOUR COMMUNITY-MEDIA BUCKET
  // =========================================================

  async function uploadMedia(postId, files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path =
        `${currentUser.id}/${postId}/${Date.now()}_${i}_${safeName}`;

      const { error: uploadError } = await db.storage
        .from("community-media")
        .upload(path, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type
        });

      if (uploadError) throw uploadError;

      const { error: metadataError } = await db
        .from("community_post_media")
        .insert({
          post_id: postId,
          farmer_id: currentUser.id,
          storage_path: path,
          media_type: file.type.startsWith("video/") ? "video" : "image",
          display_order: i
        });

      if (metadataError) throw metadataError;
    }
  }

  // =========================================================
  // 12. PUBLISH POST AND POLL
  // =========================================================

  async function publishPost() {
    const content = $("#postText").value.trim();
    const isPoll = !$("#pollFields").classList.contains("hidden");
    const question = $("#pollQuestion").value.trim();

    const options = $$(".poll-option")
      .map((input) => input.value.trim())
      .filter(Boolean);

    if (!content && !selectedFiles.length && !question) {
      toast("Write something, add media, or create a poll.");
      return;
    }

    if (isPoll && (!question || options.length < 2)) {
      toast("A poll needs a question and at least two options.");
      return;
    }

    if (selectedFiles.some((file) => file.size > 52428800)) {
      toast("Each media file must be 50 MB or smaller.");
      return;
    }

    const hasVideo = selectedFiles.some((file) =>
      file.type.startsWith("video/")
    );

    const postType = isPoll
      ? "poll"
      : hasVideo
        ? "video"
        : selectedFiles.length
          ? "image"
          : "text";

    const button = $("#publishPost");
    button.disabled = true;
    button.textContent = "Publishing...";

    let createdPost = null;

    try {
      const { data: post, error: postError } = await db
        .from("community_posts")
        .insert({
          farmer_id: currentUser.id,
          post_type: postType,
          content: content || (isPoll ? question : ""),
          visibility: "public"
        })
        .select()
        .single();

      if (postError) throw postError;

      createdPost = post;

      if (selectedFiles.length) {
        await uploadMedia(post.id, selectedFiles);
      }

      if (isPoll) {
        const { data: poll, error: pollError } = await db
          .from("community_polls")
          .insert({
            post_id: post.id,
            question: question
          })
          .select()
          .single();

        if (pollError) throw pollError;

        const { error: optionError } = await db
          .from("community_poll_options")
          .insert(
            options.map((option, index) => ({
              poll_id: poll.id,
              option_text: option,
              display_order: index
            }))
          );

        if (optionError) throw optionError;
      }

      closeModal("composerModal");
      resetComposer();
      toast("Your post has been published.");
      await loadPosts(true);

    } catch (error) {
      showError("Publishing failed", error);

      // Remove the incomplete post if a later upload/poll step failed.
      // This prevents a partially created post from remaining in the feed.
      if (createdPost) {
        await db.from("community_posts")
          .delete()
          .eq("id", createdPost.id)
          .eq("farmer_id", currentUser.id);
      }
    } finally {
      button.disabled = false;
      button.textContent = "Publish";
    }
  }

  // =========================================================
  // 13. LIKES — YOUR SQL TABLE IS community_likes
  // =========================================================

  async function toggleLike(button) {
    const postId = button.dataset.postId;

    const { data: existing, error: lookupError } = await db
      .from("community_likes")
      .select("id")
      .eq("post_id", postId)
      .eq("farmer_id", currentUser.id)
      .maybeSingle();

    if (lookupError) {
      showError("Could not check like", lookupError);
      return;
    }

    if (existing) {
      const { error } = await db
        .from("community_likes")
        .delete()
        .eq("id", existing.id);

      if (error) {
        showError("Could not remove like", error);
        return;
      }
    } else {
      const { error } = await db
        .from("community_likes")
        .insert({
          post_id: postId,
          farmer_id: currentUser.id
        });

      if (error) {
        showError("Could not like post", error);
        return;
      }
    }

    await loadPosts(true);
  }

  // =========================================================
  // 14. COMMENTS
  // =========================================================

  async function loadComments(postId, area) {
    const { data: comments, error } = await db
      .from("community_comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (error) {
      showError("Could not load comments", error);
      return;
    }

    const ids = [...new Set((comments || []).map((item) => item.farmer_id))];
    let profiles = [];

    if (ids.length) {
      const result = await db
        .from("community_profiles")
        .select("id, display_name")
        .in("id", ids);

      if (result.error) {
        showError("Could not load comment authors", result.error);
        return;
      }

      profiles = result.data || [];
    }

    const profileMap = new Map(
      profiles.map((profile) => [profile.id, profile.display_name])
    );

    area.querySelector(".comment-list").innerHTML =
      (comments || []).map((comment) => `
        <div class="comment">
          <strong>${escapeHTML(profileMap.get(comment.farmer_id) || "Farmer")}</strong>
          ${escapeHTML(comment.content)}
        </div>
      `).join("");
  }

  async function submitComment(form) {
    const card = form.closest(".post-card");
    const input = form.querySelector('input[name="comment"]');
    const content = input.value.trim();

    if (!content) return;

    const { error } = await db
      .from("community_comments")
      .insert({
        post_id: card.dataset.postId,
        farmer_id: currentUser.id,
        content: content
      });

    if (error) {
      showError("Could not send comment", error);
      return;
    }

    input.value = "";
    await loadComments(
      card.dataset.postId,
      card.querySelector(".comment-area")
    );

    toast("Comment added.");
  }

  // =========================================================
  // 15. FOLLOW AND UNFOLLOW
  // =========================================================

  async function followFarmer(farmerId) {
    if (farmerId === currentUser.id) return;

    const { error } = await db
      .from("community_follows")
      .insert({
        follower_id: currentUser.id,
        following_id: farmerId
      });

    if (error && error.code !== "23505") {
      showError("Could not follow farmer", error);
      return;
    }

    toast("You are now following this farmer.");
  }

  // =========================================================
  // 16. SHARE AND REPORT
  // =========================================================

  async function sharePost(button) {
    const postId = button.dataset.postId;
    const url =
      `${window.location.origin}${window.location.pathname}#post-${postId}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "AgriNova Community",
          url: url
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        toast("Post link copied.");
      } else {
        prompt("Copy this post link:", url);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        showError("Could not share post", error);
      }
    }
  }

  async function reportPost(button) {
    const reason = prompt("Why are you reporting this post?");
    if (!reason || !reason.trim()) return;

    const { error } = await db
      .from("community_reports")
      .insert({
        reporter_id: currentUser.id,
        post_id: button.dataset.postId,
        reason: reason.trim()
      });

    if (error) {
      showError("Could not submit report", error);
      return;
    }

    toast("Report submitted.");
  }

  // =========================================================
  // 17. MESSAGE REQUESTS — YOUR SQL USES conversations
  // =========================================================

  async function loadMessageRequests() {
    openModal("requestModal");
    $("#requestList").innerHTML = "Loading requests...";

    const { data: requests, error } = await db
      .from("community_conversations")
      .select("*")
      .eq("recipient_id", currentUser.id)
      .eq("status", "pending")
      .order("requested_at", { ascending: false });

    if (error) {
      showError("Could not load message requests", error);
      $("#requestList").textContent = error.message;
      return;
    }

    if (!requests || !requests.length) {
      $("#requestList").innerHTML =
        '<div class="empty-state">You have no pending message requests.</div>';
      return;
    }

    const senderIds = [...new Set(requests.map((item) => item.requester_id))];

    const { data: profiles, error: profileError } = await db
      .from("community_profiles")
      .select("id, display_name, avatar_url")
      .in("id", senderIds);

    if (profileError) {
      showError("Could not load request senders", profileError);
      return;
    }

    const profileMap = new Map(
      (profiles || []).map((profile) => [profile.id, profile])
    );

    $("#requestList").innerHTML = requests.map((request) => {
      const sender = profileMap.get(request.requester_id);

      return `
        <div class="request-item"
          data-request-id="${escapeHTML(request.id)}">
          <strong>${escapeHTML(sender?.display_name || "Farmer")}</strong>
          <p>Wants to start a conversation with you.</p>
          <button class="accept accept-request" type="button">Accept</button>
          <button class="decline decline-request" type="button">Decline</button>
        </div>
      `;
    }).join("");
  }

  async function respondToRequest(button, status) {
    const item = button.closest(".request-item");
    const requestId = item.dataset.requestId;

    const { error } = await db
      .from("community_conversations")
      .update({
        status: status,
        accepted_at: status === "accepted"
          ? new Date().toISOString()
          : null
      })
      .eq("id", requestId)
      .eq("recipient_id", currentUser.id)
      .eq("status", "pending");

    if (error) {
      showError("Could not update request", error);
      return;
    }

    item.remove();
    toast(status === "accepted" ? "Request accepted." : "Request declined.");
  }

  // =========================================================
  // 18. NOTIFICATIONS — YOUR SQL HAS A SEPARATE TABLE
  // =========================================================

  async function loadNotifications() {
    const { data, error } = await db
      .from("community_notifications")
      .select("*")
      .eq("recipient_id", currentUser.id)
      .order("created_at", { ascending: false })
      .limit(30);

    if (error) {
      showError("Could not load notifications", error);
      return;
    }

    const message = (data || []).length
      ? (data || []).map((item) =>
          `${item.message || item.notification_type} · ${formatDate(item.created_at)}`
        ).join("\n")
      : "You have no notifications.";

    alert(message);
  }

  // =========================================================
  // 19. SEARCH
  // =========================================================

  async function searchPosts(term) {
    if (!term) {
      await loadPosts(true);
      return;
    }

    const { data, error } = await db
      .from("community_posts")
      .select("*")
      .ilike("content", `%${term}%`)
      .order("created_at", { ascending: false })
      .limit(30);

    if (error) {
      showError("Search failed", error);
      return;
    }

    const enriched = await attachProfiles(data || []);
    const ids = enriched.map((post) => post.id);

    $("#feedContainer").innerHTML = "";

    if (!ids.length) {
      $("#feedContainer").innerHTML =
        '<div class="empty-state">No matching posts found.</div>';
      return;
    }

    const { data: media, error: mediaError } = await db
      .from("community_post_media")
      .select("*")
      .in("post_id", ids)
      .order("display_order");

    if (mediaError) {
      showError("Could not load search media", mediaError);
      return;
    }

    enriched.forEach((post) => {
      post.media = (media || []).filter((item) => item.post_id === post.id);
      post.likes = [];
      post.poll = null;
      renderPost(post);
    });

    $("#loadMoreButton").classList.add("hidden");
  }

  // =========================================================
  // 20. NAVIGATION
  // =========================================================

  async function changeView(view) {
    currentView = view;

    $$(".nav-item").forEach((button) => {
      button.classList.toggle("active", button.dataset.view === view);
    });

    const titles = {
      feed: "Community Feed",
      videos: "Videos",
      following: "Following",
      messages: "Messages",
      requests: "Message Requests"
    };

    $("#viewTitle").textContent = titles[view] || "Community";

    if (view === "requests") {
      await loadMessageRequests();
      return;
    }

    if (view === "messages") {
      $("#feedContainer").innerHTML =
        '<div class="empty-state">Open an accepted conversation to view its messages. The conversation list and chat interface still need to be added.</div>';
      $("#loadMoreButton").classList.add("hidden");
      return;
    }

    await loadPosts(true);
  }

  // =========================================================
  // 21. EVENT HANDLERS
  // =========================================================

  function attachEvents() {
    $("#feedContainer")?.addEventListener("click", async (event) => {
  if (event.target.closest("#retryCommunityFeed")) {
    await loadPosts(true);
  }
});
    $("#languageButton")?.addEventListener("click", () => {
      $("#languageMenu").classList.toggle("hidden");
    });

    $$("#languageMenu button").forEach((button) => {
      button.addEventListener("click", () => {
        translatePage(button.dataset.lang);
        $("#languageMenu").classList.add("hidden");
      });
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".language-wrap")) {
        $("#languageMenu")?.classList.add("hidden");
      }
    });

    $("#openComposer")?.addEventListener("click", () => showComposer());
    $("#quickPhoto")?.addEventListener("click", () => showComposer("photo"));
    $("#quickVideo")?.addEventListener("click", () => showComposer("video"));
    $("#quickPoll")?.addEventListener("click", () => showComposer("poll"));

    $("#chooseMedia")?.addEventListener("click", () => {
      $("#mediaInput").click();
    });

    $("#mediaInput")?.addEventListener("change", (event) => {
      selectedFiles = [...event.target.files];
      previewFiles();
    });

    $("#showPollFields")?.addEventListener("click", () => {
      $("#pollFields").classList.toggle("hidden");
    });

    $("#addPollOption")?.addEventListener("click", () => {
      const count = $$(".poll-option").length;

      if (count >= 6) {
        toast("You can add up to six poll options.");
        return;
      }

      const input = document.createElement("input");
      input.className = "poll-option";
      input.type = "text";
      input.placeholder = `Option ${count + 1}`;

      $("#pollFields").insertBefore(input, $("#addPollOption"));
    });

    $("#publishPost")?.addEventListener("click", publishPost);

    $$("[data-close]").forEach((button) => {
      button.addEventListener("click", () => closeModal(button.dataset.close));
    });

    $$(".modal").forEach((modal) => {
      modal.addEventListener("click", (event) => {
        if (event.target === modal) modal.classList.add("hidden");
      });
    });

    $$(".nav-item").forEach((button) => {
      button.addEventListener("click", () => changeView(button.dataset.view));
    });

    $("#loadMoreButton")?.addEventListener("click", () => loadPosts());

    $("#feedFilter")?.addEventListener("change", () => {
      toast("The feed is currently sorted by newest posts.");
      loadPosts(true);
    });

    $("#communitySearch")?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        searchPosts(event.target.value.trim());
      }
    });

    $("#notificationsButton")?.addEventListener("click", loadNotifications);

    $("#feedContainer")?.addEventListener("click", async (event) => {
      const like = event.target.closest(".like-post");
      const comment = event.target.closest(".toggle-comments");
      const share = event.target.closest(".share-post");
      const report = event.target.closest(".report-post");
      const vote = event.target.closest(".vote-poll");

      if (like) await toggleLike(like);

      if (comment) {
        const card = comment.closest(".post-card");
        const area = card.querySelector(".comment-area");

        area.classList.toggle("hidden");

        if (!area.classList.contains("hidden")) {
          await loadComments(card.dataset.postId, area);
        }
      }

      if (share) await sharePost(share);
      if (report) await reportPost(report);
      if (vote) await votePoll(vote);
    });

    $("#feedContainer")?.addEventListener("submit", async (event) => {
      if (!event.target.matches(".comment-form")) return;
      event.preventDefault();
      await submitComment(event.target);
    });

    $("#requestList")?.addEventListener("click", async (event) => {
      const accept = event.target.closest(".accept-request");
      const decline = event.target.closest(".decline-request");

      if (accept) await respondToRequest(accept, "accepted");
      if (decline) await respondToRequest(decline, "declined");
    });
  }

  // =========================================================
  // 22. START APPLICATION
  // =========================================================

  async function init() {
    attachEvents();
    translatePage("en");

    if (!window.supabase) {
      $("#feedContainer").innerHTML =
        '<div class="empty-state">Supabase JavaScript library did not load. Check your internet connection and the Supabase script in the HTML file.</div>';
      return;
    }

    if (!SUPABASE_KEY || SUPABASE_KEY === KEY_PLACEHOLDER) {
      $("#feedContainer").innerHTML =
        '<div class="empty-state">Supabase key is missing. Paste your public anon/publishable key into farmer-community.js.</div>';
      toast("Supabase key is not configured.");
      return;
    }

    db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    try {
      await loadCurrentUser();
      await loadPosts(true);
    } catch (error) {
      showError("Community connection failed", error);

      $("#feedContainer").innerHTML =
        `<div class="empty-state">${escapeHTML(error.message)}<br><br>Check that you are signed in and that your Supabase profile exists.</div>`;
    }
  }

  document.addEventListener("DOMContentLoaded", init);

})();
