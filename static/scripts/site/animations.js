/**
 * Crypto Message
 */

window.cryptoMessageInit = function(id){
	var cryptoBox = document.getElementById(id);
	var messages = cryptoBox.getAttribute('data-messages').split(',');
	var Messenger = function(el){
		'use strict';
		var m = this;
		m.init = function(){
			m.codeletters = "1234567890abcdefghhijklmnopqrstuvwxyz";
			m.message = 0;
			m.current_length = 0;
			m.fadeBuffer = false;
			m.messages = messages;
			setTimeout(m.animateIn, 100);
		};

		m.generateRandomString = function(length, message) {
			var random_text = '';
			while (random_text.length < length) {
				if (message[random_text.length] == ' ') {
					random_text += ' ';
				} else if (message[random_text.length] == '-') {
					random_text += '-';
				} else {
					random_text += m.codeletters.charAt(Math.floor(Math.random()*m.codeletters.length));
				}
			}
			return random_text;
		};

		m.animateIn = function(){
			if (m.current_length < m.messages[m.message].length) {
				m.current_length = m.current_length + 2;
				if (m.current_length > m.messages[m.message].length) {
					m.current_length = m.messages[m.message].length;
				}
				var message = m.generateRandomString(m.current_length, m.messages[m.message]);
				$(el).html(message);

				setTimeout(m.animateIn, 20);
			} else {
				setTimeout(m.animateFadeBuffer, 20);
			}
		};

		m.animateFadeBuffer = function(){
			if (m.fadeBuffer === false) {
				m.fadeBuffer = [];
				for (var i = 0; i < m.messages[m.message].length; i++) {
					m.fadeBuffer.push({c: (Math.floor(Math.random()*12))+1, l: m.messages[m.message].charAt(i)});
				}
			}

			var do_cycles = false;
			var message = '';

			for (var i = 0; i < m.fadeBuffer.length; i++) {
				var fader = m.fadeBuffer[i];
				if (fader.c > 0) {
					do_cycles = true;
					fader.c--;
					message += m.codeletters.charAt(Math.floor(Math.random()*m.codeletters.length));
				} else {
					message += fader.l;
				}
			}

			$(el).html(message);

			if (do_cycles === true) {
				setTimeout(m.animateFadeBuffer, 50);
			} else {
				setTimeout(m.cycleText, 2000);
			}
		};

		m.cycleText = function(){
			m.message = m.message + 1;
			if (m.message >= m.messages.length) {
				m.message = 0;
			}

			m.current_length = 0;
			m.fadeBuffer = false;
			$(el).html('');

			setTimeout(m.animateIn, 200);
		};

		m.init();
	}

	var messenger = new Messenger(cryptoBox);
	cryptoBox.removeAttribute('data-messages');
};

/**
 * Header parallax
 */

 window.headerParallaxInit = function(){
	if (enableHeaderParallax) {
		var sectionHeader = $('.section-header.parallax');
		var sectionHeaderGroup = $('.section-header-group');

		$(window).scroll(function(){
			var scrolled = $(this).scrollTop();
			var parallaxEnd = sectionHeader.height();

			if (scrolled < parallaxEnd) {
				sectionHeaderGroup.css('margin-top', scrolled + 'px');
			}
		});
	}
}

/**
 * AdHash preloader
 */

window.preloaderInit = function(afterIn){
	var preloaderSVG = '<svg id="preloader" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"> <linearGradient id="five_1_" gradientUnits="userSpaceOnUse" x1="83.96" y1="19.11" x2="83.96" y2="80.9"> <stop offset="0" style="stop-color:#62C5E4"/> <stop offset="0.2035" style="stop-color:#5EC1E0"/> <stop offset="0.4144" style="stop-color:#52B6D3"/> <stop offset="0.6286" style="stop-color:#3FA3BF"/> <stop offset="0.8439" style="stop-color:#2389A2"/> <stop offset="1" style="stop-color:#0B7188"/> </linearGradient> <rect id="five" x="78.6" y="19.1" class="shape" style="fill: url(#five_1_);" width="10.7" height="61.8"/> <linearGradient id="four_1_" gradientUnits="userSpaceOnUse" x1="97.503" y1="37.9035" x2="9.0217" y2="74.6797"> <stop offset="0" style="stop-color:#308EA4"/> <stop offset="0.3371" style="stop-color:#2F8CA1"/> <stop offset="0.5399" style="stop-color:#2C8599"/> <stop offset="0.7071" style="stop-color:#26798B"/> <stop offset="0.854" style="stop-color:#1E6777"/> <stop offset="0.9879" style="stop-color:#13515D"/> <stop offset="1" style="stop-color:#124F5A"/> </linearGradient> <polygon id="four" class="shape" style="fill: url(#four_1_);" points="8.2,80.9 13.9,66.8 95.9,32.8 100,42.7 "/> <linearGradient id="three_1_" gradientUnits="userSpaceOnUse" x1="3.9774" y1="75.8217" x2="25.9489" y2="24.0826"> <stop offset="0" style="stop-color:#A3CA80"/> <stop offset="0.1921" style="stop-color:#9BC178"/> <stop offset="0.5054" style="stop-color:#85A962"/> <stop offset="0.8987" style="stop-color:#62813F"/> <stop offset="1" style="stop-color:#587635"/> </linearGradient> <polygon id="three" class="shape" style="fill: url(#three_1_);" points="27.5,33.4 21.7,19.1 0,72.5 8.2,80.9 "/> <linearGradient id="two_1_" gradientUnits="userSpaceOnUse" x1="27.5124" y1="19.4728" x2="52.2265" y2="79.9273"> <stop offset="0" style="stop-color:#62C5E4"/> <stop offset="0.2035" style="stop-color:#5EC1E0"/> <stop offset="0.4144" style="stop-color:#52B6D3"/> <stop offset="0.6286" style="stop-color:#3FA3BF"/> <stop offset="0.8439" style="stop-color:#2389A2"/> <stop offset="1" style="stop-color:#0B7188"/> </linearGradient> <polygon id="two" class="shape" style="fill: url(#two_1_);" points="21.7,19.1 33.3,19.1 58.3,80.9 46.7,80.9 "/> <linearGradient id="one_1_" gradientUnits="userSpaceOnUse" x1="52.95" y1="19.11" x2="52.95" y2="80.9"> <stop offset="0" style="stop-color:#52B4D0"/> <stop offset="0.3005" style="stop-color:#398DA3"/> <stop offset="0.6065" style="stop-color:#246B7B"/> <stop offset="0.8504" style="stop-color:#175763"/> <stop offset="1" style="stop-color:#124F5A"/> </linearGradient> <rect id="one" x="47.6" y="19.1" class="shape" style="fill: url(#one_1_);" width="10.7" height="61.8"/></svg>';
	$(afterIn).append(preloaderSVG);

	var shape_1 = $('#preloader #five');
	var shape_2 = $('#preloader #one');
	var shape_3 = $('#preloader #two');
	var shape_4 = $('#preloader #three');
	var shape_5 = $('#preloader #four');
	var preloader = new TimelineMax({paused: false, repeat: -1, repeatDelay: 0});

	preloader.from (shape_1, 0.5, {
		opacity: 0,
		ease: Power3.ease
	}, "t1")

	.from (shape_2, 0.5, {
		opacity: 0,
		ease: Power3.ease
	}, "t1+=0.15")

	.from (shape_3, 0.5, {
		opacity: 0,
		ease: Power3.ease
	}, "t1+=0.30")

	.from (shape_4, 0.5, {
		opacity: 0,
		ease: Power3.ease
	}, "t1+=0.45")

	.from (shape_5, 0.5, {
		opacity: 0,
		ease: Power3.ease
	}, "t1+=0.60")

	.to (shape_1, 0.5, {
		opacity: 0,
		ease: Power3.ease
	}, "t1+=0.75")

	.to (shape_2, 0.5, {
		opacity: 0,
		ease: Power3.ease
	}, "t1+=0.90")

	.to (shape_3, 0.5, {
		opacity: 0,
		ease: Power3.ease
	}, "t1+=1.05")

	.to (shape_4, 0.5, {
		opacity: 0,
		ease: Power3.ease
	}, "t1+=1.2")

	.to (shape_5, 0.5, {
		opacity: 0,
		ease: Power3.ease
	}, "t1+=1.35");
}

/**
 * Communication Protocol
 */

window.animCommunicationProtocolInit = function(){
	var communicationProtocol = new TimelineMax ({paused: true});

	var user_group = $('#communication_protocol #user_x5F_wrap');
	var user_stroke_outer = $('#communication_protocol #user_x5F_outer_1_');
	var user_stroke_oLength = {length: 0, pathLength: user_stroke_outer[0].getTotalLength()};
	var user_stroke_inner = $('#communication_protocol #user_x5F_inner_1_');
	var user_stroke_iLength = {length: 0, pathLength: user_stroke_inner[0].getTotalLength()};

	var arrow_1 = $('#communication_protocol #arrow_x5F_1_x5F_content_x5F_request_2_');
	var arrow_1_sLength = {length: 0, pathLength: arrow_1[0].getTotalLength()};

	var content_request = $('#communication_protocol #content_x5F_request');

	var publisher_group = $('#communication_protocol #publisher_x5F_wrap');
	var publisher_stroke_outer = $('#communication_protocol #pub_x5F_outer_1_');
	var publisher_stroke_oLength = {length: 0, pathLength: publisher_stroke_outer[0].getTotalLength()};
	var publisher_stroke_inner = $('#communication_protocol #pub_x5F_inner_1_');
	var publisher_stroke_iLength = {length: 0, pathLength: publisher_stroke_inner[0].getTotalLength()};

	var arrow_2 = $('#communication_protocol #arrow_x5F_2_x5F_content_x5F_ad_x5F_placement_2_');
	var arrow_2_sLength = {length: 0, pathLength: arrow_2[0].getTotalLength()};

	var content_and_ad_placement = $('#communication_protocol #content_x5F_ad_x5F_placement');

	var arrow_3 = $('#communication_protocol #arrow_x5F_3_x5F_ad_x5F_request');
	var arrow_3_sLength = {length: 0, pathLength: arrow_3[0].getTotalLength()};

	var ad_request = $('#communication_protocol #ad_x5F_request');

	var bidder_group = $('#communication_protocol #bidder_x5F_wrap');
	var bidder_stroke_outer = $('#communication_protocol #bidder_x5F_outer_1_');
	var bidder_stroke_oLength = {length: 0, pathLength: bidder_stroke_outer[0].getTotalLength()};
	var bidder_stroke_inner = $('#communication_protocol #bidder_x5F_inner_1_');
	var bidder_stroke_iLength = {length: 0, pathLength: bidder_stroke_inner[0].getTotalLength()};

	var arrow_4 = $('#communication_protocol #arrow_x5F_4_x5F_ad_x5F_address_2_');
	var arrow_4_sLength = {length: 0, pathLength: arrow_4[0].getTotalLength()};

	var ad_address = $('#communication_protocol #ad_x5F_address');

	var arrow_5 = $('#communication_protocol #arrow_x5F_5_x5F_ssl_2_');
	var arrow_5_sLength = {length: 0, pathLength: arrow_5[0].getTotalLength()};

	var ssl_text = $('#communication_protocol #ssl');

	var advertiser_group = $('#communication_protocol #advertiser_x5F_wrap');
	var advertiser_stroke_outer = $('#communication_protocol #adv_x5F_outer_1_');
	var advertiser_stroke_oLength = {length: 0, pathLength: advertiser_stroke_outer[0].getTotalLength()};
	var advertiser_stroke_inner = $('#communication_protocol #adv_x5F_inner_1_');
	var advertiser_stroke_iLength = {length: 0, pathLength: advertiser_stroke_inner[0].getTotalLength()};

	var arrow_6 = $('#communication_protocol #arrow_x5F_6_x5F_encrypted_x5F_creatives_2_');
	var arrow_6_sLength = {length: 0, pathLength: arrow_6[0].getTotalLength()};

	var encrypted_creatives = $('#communication_protocol #encrypted_x5F_creatives');

	var arrow_7 = $('#communication_protocol #arrow_x5F_7_x5F_decryption');
	var arrow_7_sLength = {length: 0, pathLength: arrow_7[0].getTotalLength()};

	var decryption_wrap = $('#communication_protocol #decryption');

	var oct_text = $('#communication_protocol #oct_x5F_text path');
	var oct_dasshed = $('#communication_protocol #box_x5F_dashed_x5F_OCT_1_');
	var oct_arrow_left = $('#communication_protocol #oct_x5F_arrow_x5F_right_1_');
	var oct_arrow_right = $('#communication_protocol #oct_x5F_arrow_x5F_right');
	var oct_green_cubes = $('#communication_protocol #oct_x5F_green_x5F_cubes polygon');
	var oct_blue_cubes = $('#communication_protocol #oct_x5F_blue_x5F_cubes polygon');
	var oct_bracket_left = $('#communication_protocol #oct-bracket_x5F_left');
	var oct_bracket_right = $('#communication_protocol #oct-bracket-right');
	var oct_a_sum = $('#communication_protocol #oct_x5F_adv_x5F_sum_x5F_wrap');
	var oct_p_sum = $('#communication_protocol #oct_x5F_pub_x5F_sum_x5F_wrap');

	var arrow_8 = $('#communication_protocol #arrow_x5F_daily_x5F_sum_x5F_advertiser');
	var arrow_8_sLength = {length: 0, pathLength: arrow_8[0].getTotalLength()};

	var arrow_9 = $('#communication_protocol #arrow_x5F_daily_x5F_sum_x5F_publisher');
	var arrow_9_sLength = {length: 0, pathLength: arrow_9[0].getTotalLength()};

	var daily_sum_a = $('#communication_protocol #daily_x5F_sum_x5F_advertiser');
	var daily_sum_p = $('#communication_protocol #daily_x5F_sum_x5F_publisher');

	var hour_box_sum_a = $('#communication_protocol #_x32_4_x5F_bot_x5F_left');
	var hour_box_sum_p = $('#communication_protocol #_x32_4_x5F_bot_x5F_right');

	var sum_a = $('#communication_protocol #adv_x5F_sum_x5F_wrap');
	var sum_p = $('#communication_protocol #pub_x5F_sum_x5F_wrap');

	var arrow_10 = $('#communication_protocol #arrow_x5F_rewards_x5F_initiation_2_');
	var arrow_10_sLength = {length: 0, pathLength: arrow_10[0].getTotalLength()};

	var rewards_initiation = $('#communication_protocol #rewards_x5F_initiation');

	var blockchain_text = $('#communication_protocol #blockchain_x5F_text path');
	var blockchain_dashed = $('#communication_protocol #box_x5F_dashed_x5F_blockchain_1_');
	var blockchain_dash_box = $("#communication_protocol #grey_x5F_1_1_");
	var blockchain_gray_blocks = $('#communication_protocol #grey_x5F_blocks_x5F_blockchain_1_ polygon');

	var arrow_11 = $('#communication_protocol #arrow_x5F_daily_x5F_advertising_x5F_spend');
	var arrow_11_sLength = {length: 0, pathLength: arrow_11[0].getTotalLength()};

	var daily_advertiser_spend = $('#communication_protocol #daily_x5F_advertising_x5F_spend');

	var hour_box_adv_spend = $('#communication_protocol #_x32_4_x5F_top_x5F_left');

	var blockchain_color_box = $('#communication_protocol #colour_x5F_block_x5F_blockchain_1_ polygon');

	var voting_group = $('#communication_protocol #voting_x5F_wrap');
	var voting_stroke_outer = $('#communication_protocol #voting_x5F_outer_1_');
	var voting_stroke_oLength = {length: 0, pathLength: voting_stroke_outer[0].getTotalLength()};
	var voting_stroke_inner = $('#communication_protocol #voting_x5F_inner_1_');
	var voting_stroke_iLength = {length: 0, pathLength: voting_stroke_inner[0].getTotalLength()};
	var voting_result = $('#communication_protocol #voting_x5F_results_x5F_wrap');

	var arrow_12 = $('#communication_protocol #arrow_x5F_voting_x5F_rewards_1_');
	var arrow_12_sLength = {length: 0, pathLength: arrow_12[0].getTotalLength()};

	var voting_rewards = $('#communication_protocol #voting_x5F_rewards');

	var hour_box_voting_rewards = $('#communication_protocol #_x32__x5F_week');

	var arrow_13 = $('#communication_protocol #arrow_x5F_daily_x5F_publisher_x5F_payment_1_');
	var arrow_13_sLength = {length: 0, pathLength: arrow_13[0].getTotalLength()};

	var daily_publisher_paiment = $('#communication_protocol #daily_x5F_publisher_x5F_payment');

	var hour_box_pub_payment = $('#communication_protocol #_x32_4_x5F_top_x5F_right');

	var arrow_14 = $('#communication_protocol #arrow_x5F_individual_x5F_OCT_x5F_advertiser');
	var arrow_14_sLength = {length: 0, pathLength: arrow_14[0].getTotalLength()};

	var arrow_15 = $('#communication_protocol #arrow_x5F_individual_x5F_OCT_x5F_publisher');
	var arrow_15_sLength = {length: 0, pathLength: arrow_15[0].getTotalLength()};

	var individual_oct_adv = $('#communication_protocol #individual_x5F_OCT_x5F_advertiser');
	var individual_oct_pub = $('#communication_protocol #individual_x5F_OCT_x5F_publisher');

	var arrow_16 = $('#communication_protocol #arrow_x5F_off_x5F_chain_x5F_ver_x5F_advertiser');
	var arrow_16_sLength = {length: 0, pathLength: arrow_16[0].getTotalLength()};

	var arrow_17 = $('#communication_protocol #arrow_x5F_off_x5F_chain_x5F_ver_x5F_publisher');
	var arrow_17_sLength = {length: 0, pathLength: arrow_17[0].getTotalLength()};

	var off_chain_verification_adv = $('#communication_protocol #off_x5F_chain_x5F_ver_x5F_advertiser');
	var off_chain_verification_pub = $('#communication_protocol #off_x5F_chain_x5F_ver_x5F_publisher');

	var arrow_18 = $('#communication_protocol #arrow_x5F_creative_x5F_hashes_2_');
	var arrow_18_sLength = {length: 0, pathLength: arrow_18[0].getTotalLength()};

	var creative_hashes = $('#communication_protocol #creative_x5F_hashes');

	var arrow_19 = $('#communication_protocol #arrow_x5F_targeting_x5F_budget_2_');
	var arrow_19_sLength = {length: 0, pathLength: arrow_19[0].getTotalLength()};

	var arrow_20 = $('#communication_protocol #arrow_x5F_blacklists_x5F_whitelists_2_');
	var arrow_20_sLength = {length: 0, pathLength: arrow_20[0].getTotalLength()};

	var targeting_and_budget = $('#communication_protocol #targeting_x5F_budget');
	var blacklists_and_whitelists = $('#communication_protocol #blacklists_x5F_whitelists');

	var arrow_21 = $('#communication_protocol #arrow_x5F_appeals_x5F_deposits_x5F_advertiser');
	var arrow_21_sLength = {length: 0, pathLength: arrow_21[0].getTotalLength()};

	var arrow_22 = $('#communication_protocol #arrow_x5F_appeals_x5F_deposits_x5F_publisher');
	var arrow_22_sLength = {length: 0, pathLength: arrow_22[0].getTotalLength()};

	var appeals_and_deposits_adv = $('#communication_protocol #appeals_x5F_deposits_x5F_advertiser');
	var appeals_and_deposits_pub = $('#communication_protocol #appeals_x5F_deposits_x5F_publisher');

	var arrow_23 = $('#communication_protocol #arrow_x5F_flagging_2_');
	var arrow_23_sLength = {length: 0, pathLength: arrow_23[0].getTotalLength()};

	var flagging_wrap = $('#communication_protocol #flagging');

	var arrow_24 = $('#communication_protocol #arrow_x5F_blocklists_x5F_voting_2_');
	var arrow_24_sLength = {length: 0, pathLength: arrow_24[0].getTotalLength()};

	var blocklists_voting = $('#communication_protocol #blocklists_x5F_voting');

	var arrow_25 = $('#communication_protocol #arrow_x5F_blacklists_2_');
	var arrow_25_sLength = {length: 0, pathLength: arrow_25[0].getTotalLength()};

	var blacklists_wrap = $('#communication_protocol #blacklists');

	var arrow_26 = $('#communication_protocol #arrow_x5F_blocklists_x5F_blockchain_2_');
	var arrow_26_sLength = {length: 0, pathLength: arrow_26[0].getTotalLength()};

	var blocklists_blockchain = $('#communication_protocol #blocklist_x5F_blockchain');

	var color_cube = $('#communication_protocol #colour_x5F_block_x5F_blockchain_1_');
	var color_cube_outline = $('#communication_protocol #color_x5F_block_x5F_outline');

	function drawUserOuter() {
		user_stroke_outer[0].style.strokeDasharray = [user_stroke_oLength.length, user_stroke_oLength.pathLength].join(' ');
	};

	function drawUserInner() {
		user_stroke_inner[0].style.strokeDasharray = [user_stroke_iLength.length, user_stroke_iLength.pathLength].join(' ');
	};

	function drawArr1 () {
		arrow_1[0].style.strokeDasharray = [arrow_1_sLength.length, arrow_1_sLength.pathLength].join(' ');
	};

	function drawPublisherOuter() {
		publisher_stroke_outer[0].style.strokeDasharray = [publisher_stroke_oLength.length, publisher_stroke_oLength.pathLength].join(' ');
	};

	function drawPublisherInner() {
		publisher_stroke_inner[0].style.strokeDasharray = [publisher_stroke_iLength.length, publisher_stroke_iLength.pathLength].join(' ');
	};

	function drawArr2 () {
		arrow_2[0].style.strokeDasharray = [arrow_2_sLength.length, arrow_2_sLength.pathLength].join(' ');
	};

	function drawArr3 () {
		arrow_3[0].style.strokeDasharray = [arrow_3_sLength.length, arrow_3_sLength.pathLength].join(' ');
	};

	function drawBidderOuter() {
		bidder_stroke_outer[0].style.strokeDasharray = [bidder_stroke_oLength.length, bidder_stroke_oLength.pathLength].join(' ');
	};

	function drawBidderInner() {
		bidder_stroke_inner[0].style.strokeDasharray = [bidder_stroke_iLength.length, bidder_stroke_iLength.pathLength].join(' ');
	};

	function drawArr4 () {
		arrow_4[0].style.strokeDasharray = [arrow_4_sLength.length, arrow_4_sLength.pathLength].join(' ');
	};

	function drawArrFive () {
		arrow_5[0].style.strokeDasharray = [arrow_5_sLength.length, arrow_5_sLength.pathLength].join(' ');
	};

	function drawAdvertiserOuter() {
		advertiser_stroke_outer[0].style.strokeDasharray = [advertiser_stroke_oLength.length, advertiser_stroke_oLength.pathLength].join(' ');
	};

	function drawAdvertiserInner() {
		advertiser_stroke_inner[0].style.strokeDasharray = [advertiser_stroke_iLength.length, advertiser_stroke_iLength.pathLength].join(' ');
	};

	function drawArr6 () {
		arrow_6[0].style.strokeDasharray = [arrow_6_sLength.length, arrow_6_sLength.pathLength].join(' ');
	};

	function drawArr7 () {
		arrow_7[0].style.strokeDasharray = [arrow_7_sLength.length, arrow_7_sLength.pathLength].join(' ');
	};

	function drawArr8 () {
		arrow_8[0].style.strokeDasharray = [arrow_8_sLength.length, arrow_8_sLength.pathLength].join(' ');
	};

	function drawArr9 () {
		arrow_9[0].style.strokeDasharray = [arrow_9_sLength.length, arrow_9_sLength.pathLength].join(' ');
	};

	function drawArr10 () {
		arrow_10[0].style.strokeDasharray = [arrow_10_sLength.length, arrow_10_sLength.pathLength].join(' ');
	};

	function drawArr11 () {
		arrow_11[0].style.strokeDasharray = [arrow_11_sLength.length, arrow_11_sLength.pathLength].join(' ');
	};

	function drawVotingOuter() {
		voting_stroke_outer[0].style.strokeDasharray = [voting_stroke_oLength.length, voting_stroke_oLength.pathLength].join(' ');
	};

	function drawVotingInner() {
		voting_stroke_inner[0].style.strokeDasharray = [voting_stroke_iLength.length, voting_stroke_iLength.pathLength].join(' ');
	};

	function drawArr12 () {
		arrow_12[0].style.strokeDasharray = [arrow_12_sLength.length, arrow_12_sLength.pathLength].join(' ');
	};

	function drawArr13 () {
		arrow_13[0].style.strokeDasharray = [arrow_13_sLength.length, arrow_13_sLength.pathLength].join(' ');
	};

	function drawArr14 () {
		arrow_14[0].style.strokeDasharray = [arrow_14_sLength.length, arrow_14_sLength.pathLength].join(' ');
	};

	function drawArr15 () {
		arrow_15[0].style.strokeDasharray = [arrow_15_sLength.length, arrow_15_sLength.pathLength].join(' ');
	};

	function drawArr16 () {
		arrow_16[0].style.strokeDasharray = [arrow_16_sLength.length, arrow_16_sLength.pathLength].join(' ');
	};

	function drawArr17 () {
		arrow_17[0].style.strokeDasharray = [arrow_17_sLength.length, arrow_17_sLength.pathLength].join(' ');
	};

	function drawArr18 () {
		arrow_18[0].style.strokeDasharray = [arrow_18_sLength.length, arrow_18_sLength.pathLength].join(' ');
	};

	function drawArr19 () {
		arrow_19[0].style.strokeDasharray = [arrow_19_sLength.length, arrow_19_sLength.pathLength].join(' ');
	};

	function drawArr20 () {
		arrow_20[0].style.strokeDasharray = [arrow_20_sLength.length, arrow_20_sLength.pathLength].join(' ');
	};

	function drawArr21 () {
		arrow_21[0].style.strokeDasharray = [arrow_21_sLength.length, arrow_21_sLength.pathLength].join(' ');
	};

	function drawArr22 () {
		arrow_22[0].style.strokeDasharray = [arrow_22_sLength.length, arrow_22_sLength.pathLength].join(' ');
	};

	function drawArr23 () {
		arrow_23[0].style.strokeDasharray = [arrow_23_sLength.length, arrow_23_sLength.pathLength].join(' ');
	};

	function drawArr24 () {
		arrow_24[0].style.strokeDasharray = [arrow_24_sLength.length, arrow_24_sLength.pathLength].join(' ');
	};

	function drawArr25 () {
		arrow_25[0].style.strokeDasharray = [arrow_25_sLength.length, arrow_25_sLength.pathLength].join(' ');
	};

	function drawArr26 () {
		arrow_26[0].style.strokeDasharray = [arrow_26_sLength.length, arrow_26_sLength.pathLength].join(' ');
	};

	/**
	 * Communication Protocol Step 1 (cps-1)
	 * user
	 */
	communicationProtocol.add(function(){
		$('[id*="cps-"]').removeClass('active').find('input[type="checkbox"]').prop('checked', false);
		$('#cps-1').addClass('active').find('input[type="checkbox"]').prop('checked', true);
	}, "cps-1")

	.from (user_group, 0.5, {
		opacity: 0,
		scale: 0, transformOrigin: "center",
		ease: Power3.easeOut
	})

	.to (user_stroke_oLength, 1, {
		opacity: 1,
		length: user_stroke_oLength.pathLength,
		onUpdate: drawUserOuter,
		ease: Power3.easeOut
	})

	.from (user_stroke_outer, 0.001, {
		opacity: 0
	}, "-=0.99")

	.to (user_stroke_iLength, 1, {
		length: user_stroke_iLength.pathLength,
		onUpdate: drawUserInner,
		ease: Power3.easeOut
	}, "-=1")

	.from (user_stroke_inner, 0.001, {
		opacity: 0
	}, "-=0.99")

	/* arrow 1 content reqest */

	.to(arrow_1_sLength, 1.5, {
		opacity: 1,
		length: arrow_1_sLength.pathLength,
		onUpdate: drawArr1,
		ease: Power3.easeOut
	})

	.from (arrow_1, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (content_request, 0.5, {
		opacity: 0,
		transform: "translateX(-10px)",
		ease: Power3.easeOut
	}, "-=1.3")

	/* publisher */

	.from (publisher_group, 0.5, {
		opacity:0,
		scale: 0, transformOrigin: "center",
		ease: Power3.easeOut
	})

	.to (publisher_stroke_oLength, 1, {
		length: publisher_stroke_oLength.pathLength,
		onUpdate: drawPublisherOuter,
		ease: Power3.easeOut
	})

	.from (publisher_stroke_outer, 0.001, {
		opacity: 0
	}, "-=0.99")

	.to(publisher_stroke_iLength, 1, {
		length: publisher_stroke_iLength.pathLength,
		onUpdate: drawPublisherInner,
		ease: Power3.easeOut
	}, "-=1")

	.from (publisher_stroke_inner, 0.001, {
		opacity: 0
	}, "-=0.99")

	/* arrow 2 content and ad placement */

	.to (arrow_2_sLength, 1.5, {
		opacity: 1,
		length: arrow_2_sLength.pathLength,
		onUpdate: drawArr2,
		ease: Power3.easeOut
	})

	.from (arrow_2, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (content_and_ad_placement, 0.5, {
		opacity: 0,
		transform: "translateX(10px)",
		ease: Power3.powerEase
	}, "-=1.3")

	/* arrow 3 ad request */

	.to (arrow_3_sLength, 1.5, {
		opacity: 1,
		length: arrow_3_sLength.pathLength,
		onUpdate: drawArr3,
		ease: Power3.easeOut
	})

	.from (arrow_3, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (ad_request, 0.5, {
		opacity: 0,
		transform: "translateY(10px)",
		ease: Power3.easeOut
	}, "-=1.3")

	/* bidder */

	.from (bidder_group, 0.5, {
		opacity: 0,
		scale: 0, transformOrigin: "center",
		ease: Power3.easeOut
	})

	.to (bidder_stroke_oLength, 1, {
		length: bidder_stroke_oLength.pathLength,
		onUpdate: drawBidderOuter,
		ease: Power3.easeOut
	})

	.from (bidder_stroke_outer, 0.001, {
		opacity: 0
	}, "-=0.99")

	.to(bidder_stroke_iLength, 1, {
		length: bidder_stroke_iLength.pathLength,
		onUpdate: drawBidderInner,
		ease: Power3.easeOut
	}, "-=1")

	.from (bidder_stroke_inner, 0.001, {
		opacity: 0
	}, "-=0.99")

	/* arrow 4 ad address */

	.to (arrow_4_sLength, 1.5, {
		opacity: 1,
		length: arrow_4_sLength.pathLength,
		onUpdate: drawArr4,
		ease: Power3.easeOut
	})

	.from (arrow_4, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (ad_address, 0.5, {
		opacity: 0,
		transform: "translateY(-10px)",
		ease: Power3.easeOut
	}, "-=1.3")

	/* arrow 5 ssl */

	.to (arrow_5_sLength, 1.5, {
		opacity: 1,
		length: arrow_5_sLength.pathLength,
		onUpdate: drawArrFive,
		ease: Power3.easeOut
	})

	.from (arrow_5, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (ssl_text, 0.5, {
		opacity: 0,
		transform: "translateX(10px)",
		ease: Power3.easeOut
	}, "-=1.3")

	/* advertiser */

	.from (advertiser_group, 0.5, {
		opacity: 0,
		scale: 0, transformOrigin: "center",
		ease: Power3.easeOut
	})

	.to (advertiser_stroke_oLength, 1, {
		length: advertiser_stroke_oLength.pathLength,
		onUpdate: drawAdvertiserOuter,
		ease: Power3.easeOut
	})

	.from (advertiser_stroke_outer, 0.001, {
		opacity: 0
	}, "-=0.99")

	.to (advertiser_stroke_iLength, 1, {
		length: advertiser_stroke_iLength.pathLength,
		onUpdate: drawAdvertiserInner,
		ease: Power3.easeOut
	}, "-=1")

	.from (advertiser_stroke_inner, 0.001, {
		opacity: 0
	}, "-=0.99")

	/* arrow 6 encrypder creatives */

	.to (arrow_6_sLength, 1.5, {
		opacity: 1,
		length: arrow_6_sLength.pathLength,
		onUpdate: drawArr6,
		ease: Power3.easeOut
	})

	.from (arrow_6, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (encrypted_creatives, 0.5, {
		opacity: 0,
		transform: "translateX(-10px)",
		ease: Power3.easeOut
	}, "-=1.3")

	/* arrow 7 decryption */

	.to (arrow_7_sLength, 1.5, {
		opacity: 1,
		length: arrow_7_sLength.pathLength,
		onUpdate: drawArr7,
		ease: Power3.easeOut
	})

	.from (arrow_7, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (decryption_wrap, 0.5, {
		opacity: 0,
		transform: "translateX(-10px)",
		ease: Power3.easeOut,
	}, "-=1.3")

	.fromTo(decryption_wrap, 2, {
		opacity: 1
	}, {opacity: 1})

	/**
	 * Communication Protocol Step 2 (cps-2)
	 */
	.add(function(){
		$('[id*="cps-"]').removeClass('active').find('input[type="checkbox"]').prop('checked', false);
		$('#cps-1, #cps-2').addClass('active').find('input[type="checkbox"]').prop('checked', true);
		fst1();
	}, "cps-2")

	/* off-chain transactions */

	.staggerFrom (oct_text, 0.5, {
		opacity: 0,
		transform: "translateY(-5px)",
		ease: Power3.easeOut
	}, 0.02)

	.from (oct_dasshed, 1, {
		opacity: 0,
		ease: Power3.easeOut
	}, "-=1")

	.from (oct_arrow_left, 0.2, {
		opacity: 0,
		transform: "translateX(10px)",
		ease: Power3.easeOut,
	}, "-=0.5")

	.from (oct_arrow_right, 0.2, {
		opacity: 0,
		transform: "translateX(-10px)",
		ease: Power3.easeOut,
	}, "-=0.5")

	.staggerFrom (oct_green_cubes, 0.5, {
		opacity: 0,
		ease: Power3.easeOut
	}, 0.01)

	.staggerFrom (oct_blue_cubes, 0.5, {
		opacity: 0,
		ease: Power3.easeOut
	}, 0.01, "-=0.825")

	.from (oct_bracket_left, 0.5, {
		opacity: 0,
		transform: "translateX(10px)",
		ease: Power3.easeOut
	}, "-=0.5")

	.from (oct_bracket_right, 0.5, {
		opacity: 0,
		transform: "translateX(-10px)",
		ease: Power3.easeOut
	}, "-=0.5")

	.from (oct_a_sum, 0.5, {
		opacity: 0,
		scale: 0, transformOrigin: "center",
		ease: Power3.easeOut
	}, "-=0.3")

	.from (oct_p_sum, 0.5, {
		opacity: 0,
		scale: 0, transformOrigin: "center",
		ease: Power3.easeOut
	}, "-=0.5")

	/* arrow 8 & 9 daily sum of transactions */
	.add("t1")

	.to (arrow_8_sLength, 1.5, {
		opacity: 1,
		length: arrow_8_sLength.pathLength,
		onUpdate: drawArr8,
		ease: Power3.easeOut
	})

	.from (arrow_8, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (daily_sum_a, 0.5, {
		opacity: 0,
		transform: "translateX(10px)",
		ease: Power3.easeOut,
	}, "-=1.3")

	.from (hour_box_sum_a, 0.5, {
		opacity: 0,
		scale: 0, transformOrigin: "center",
		ease: Power3.easeOut
	}, "-=1.3")

	.to (arrow_9_sLength, 1.5, {
		opacity: 1,
		length: arrow_9_sLength.pathLength,
		onUpdate: drawArr9,
		ease: Power3.easeOut
	}, "t1")

	.from (arrow_9, 0.001, {
		opacity: 0
	}, "t1")

	.from (daily_sum_p, 0.5, {
		opacity: 0,
		transform: "translateX(-10px)",
		ease: Power3.easeOut,
	}, "-=1.3")

	.from (hour_box_sum_p, 0.5, {
		opacity: 0,
		scale: 0, transformOrigin: "center",
		ease: Power3.easeOut
	}, "-=1.3")

	.from (sum_a, 0.5, {
		opacity: 0,
		scale: 0, transformOrigin: "center",
		ease: Power3.easeOut
	})

	.from (sum_p, 0.5, {
		opacity: 0,
		scale: 0, transformOrigin: "center",
		ease: Power3.easeOut
	}, "-=0.5")

	/* arrow 10 rewards initiation */

	.to (arrow_10_sLength, 1.5, {
		opacity: 1,
		length: arrow_10_sLength.pathLength,
		onUpdate: drawArr10,
		ease: Power3.easeOut
	})

	.from (arrow_10, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (rewards_initiation, 0.5, {
		opacity: 0,
		transform: "translateY(10px)",
		ease: Power3.ease,
	}, "-=1.4")

	/* blockchain */

	.staggerFrom (blockchain_text, 0.5, {
		opacity: 0,
		transform: "translateY(-5px)",
		ease: Power3.easeOut
	}, 0.02)

	.from (blockchain_dashed, 1, {
		opacity: 0,
		ease: Power3.easeOut
	}, "-=0.7")

	.from (blockchain_dash_box, 0.2, {
		opacity: 0,
		transform: "translateY(-10px)",
		ease: Power3.easeOut
	})

	.staggerFrom (blockchain_gray_blocks, 0.5, {
		opacity: 0,
		transform: "translateY(-10px)",
		ease: Power3.easeOut
	}, 0.02, "-=0.1")

	/* arrow 11 daily advertiser spend */

	.to (arrow_11_sLength, 1.5, {
		opacity: 1,
		length: arrow_11_sLength.pathLength,
		onUpdate: drawArr11,
		ease: Power3.easeOut
	})

	.from (arrow_11, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (hour_box_adv_spend, 0.5, {
		opacity: 0,
		scale: 0, transformOrigin: "center",
		ease: Power3.easeOut
	}, "-=1.3")

	.from (daily_advertiser_spend, 0.5, {
		opacity: 0,
		transform: "translateX(-10px)",
		ease: Power3.easeOut
	}, "-=1.1")

	.staggerFrom (blockchain_color_box, 0.5, {
		opacity: 0,
		transform: "translateY(-10px)",
		ease: Power3.easeOut
	},0.05, "-=0.8")

	/* voting */

	.from (voting_group, 0.5, {
		opacity: 0,
		scale: 0, transformOrigin: "center",
		ease: Power3.easeOut
	})

	.to (voting_stroke_oLength, 1, {
		length: voting_stroke_oLength.pathLength,
		onUpdate: drawVotingOuter,
		ease: Power3.easeOut
	})

	.from (voting_stroke_outer, 0.001, {
		opacity: 0
	}, "-=0.99")

	.to (voting_stroke_iLength, 1, {
		length: voting_stroke_iLength.pathLength,
		onUpdate: drawVotingInner,
		ease: Power3.easeOut
	}, "-=1")

	.from (voting_stroke_inner, 0.001, {
		opacity: 0
	}, "-=0.99")

	.from (voting_result, 0.5, {
		opacity: 0,
		transform: "translateY(-10px)",
		ease: Power3.easeOut
	}, "-=0.5")

	/* arrow 12 voting rewards */

	.to (arrow_12_sLength, 1.5, {
		opacity: 1,
		length: arrow_12_sLength.pathLength,
		onUpdate: drawArr12,
		ease: Power3.easeOut
	})

	.from (arrow_12, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (hour_box_voting_rewards, 0.5, {
		opacity: 0,
		scale: 0, transformOrigin: "center",
		ease: Power3.easeOut
	}, "-=1.5")

	.from (voting_rewards, 0.5, {
		opacity: 0,
		transform: "translateX(10px)",
		ease: Power3.easeOut
	}, "-=1.2")

	/* arrow 13 daily publisher paiment */

	.to (arrow_13_sLength, 1.5, {
		opacity: 1,
		length: arrow_13_sLength.pathLength,
		onUpdate: drawArr13,
		ease: Power3.easeOut
	})

	.from (arrow_13, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (hour_box_pub_payment, 0.5, {
		opacity: 0,
		scale: 0, transformOrigin: "center",
		ease: Power3.easeOut
	}, "-=1.4")

	.from (daily_publisher_paiment, 0.5, {
		opacity: 0,
		transform: "translateX(10px)",
		ease: Power3.easeOut
	}, "-=1.2")

	/* arrow 14 & 15 individual off-chain transactions */

	.to (arrow_14_sLength, 1.5, {
		opacity: 1,
		length: arrow_14_sLength.pathLength,
		onUpdate: drawArr14,
		ease: Power3.easeOut
	})

	.to (arrow_15_sLength, 1.5, {
		opacity: 1,
		length: arrow_15_sLength.pathLength,
		onUpdate: drawArr15,
		ease: Power3.easeOut
	}, "-=1.5")

	.from (arrow_14, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (arrow_15, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (individual_oct_adv, 0.5, {
		opacity: 0,
		transform: "translateX(-10px)",
		ease: Power3.easeOut
	}, "-=1.3")

	.from (individual_oct_pub, 0.5, {
		opacity: 0,
		transform: "translateX(10px)",
		ease: Power3.easeOut
	}, "-=1.3")

	.fromTo(decryption_wrap, 2, {
		opacity: 1
	}, {opacity: 1})

	/**
	 * Communication Protocol Step 3 (cps-3)
	 */
	.add(function(){
		$('[id*="cps-"]').removeClass('active').find('input[type="checkbox"]').prop('checked', false);
		$('#cps-1, #cps-2, #cps-3').addClass('active').find('input[type="checkbox"]').prop('checked', true);
		fst1();
		fst2();
	}, "cps-3")

	/* arrow 16 & 17 off-chain verification */

	.to (arrow_16_sLength, 1.5, {
		opacity: 1,
		length: arrow_16_sLength.pathLength,
		onUpdate: drawArr16,
		ease: Power3.easeOut
	})

	.to (arrow_17_sLength, 1.5, {
		opacity: 1,
		length: arrow_17_sLength.pathLength,
		onUpdate: drawArr17,
		ease: Power3.easeOut
	}, "-=1.5")

	.from (arrow_16, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (arrow_17, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (off_chain_verification_adv, 0.5, {
		opacity: 0,
		transform: "translateX(-10px)",
		ease: Power3.easeOut
	}, "-=1.3")

	.from (off_chain_verification_pub, 0.5, {
		opacity: 0,
		transform: "translateX(10px)",
		ease: Power3.easeOut
	}, "-=1.3")

	/* arrow 18 creative hashes */

	.to (arrow_18_sLength, 1.5, {
		opacity: 1,
		length: arrow_18_sLength.pathLength,
		onUpdate: drawArr18,
		ease: Power3.easeOut
	})

	.from (arrow_18, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (creative_hashes, 0.5, {
		opacity: 0,
		transform: "translateX(-10px)",
		ease: Power3.easeOut
	}, "-=1.25")

	/* arrow 19 & 20 targeting and budget & blacklist and whitelists */

	.to (arrow_19_sLength, 1.5, {
		opacity: 1,
		length: arrow_19_sLength.pathLength,
		onUpdate: drawArr19,
		ease: Power3.easeOut
	})

	.to (arrow_20_sLength, 1.5, {
		opacity: 1,
		length: arrow_20_sLength.pathLength,
		onUpdate: drawArr20,
		ease: Power3.easeOut
	}, "-=1.5")

	.from (arrow_19, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (arrow_20, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (targeting_and_budget, 0.5, {
		opacity: 0,
		transform: "translateX(-10px)",
		ease: Power3.easeOut
	}, "-=1.4")

	.from (blacklists_and_whitelists, 0.5, {
		opacity: 0,
		transform: "translateX(10px)",
		ease: Power3.easeOut
	}, "-=1.3")

	/* arrow 21 & 22 appeals and deposists */

	.to (arrow_21_sLength, 1.5, {
		opacity: 1,
		length: arrow_21_sLength.pathLength,
		onUpdate: drawArr21,
		ease: Power3.easeOut
	})

	.to (arrow_22_sLength, 1.5, {
		opacity: 1,
		length: arrow_22_sLength.pathLength,
		onUpdate: drawArr22,
		ease: Power3.easeOut
	}, "-=1.5")

	.from (arrow_21, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (arrow_22, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (appeals_and_deposits_adv, 0.5, {
		opacity: 0,
		transform: "translateX(-10px)",
		ease: Power3.easeOut
	}, "-=1.4")

	.from (appeals_and_deposits_pub, 0.5, {
		opacity: 0,
		transform: "translateX(10px)",
		ease: Power3.easeOut
	}, "-=1.5")

	/* arrow 23 flagging */

	.to (arrow_23_sLength, 1.5, {
		opacity: 1,
		length: arrow_23_sLength.pathLength,
		onUpdate: drawArr23,
		ease: Power3.easeOut
	})

	.from (arrow_23, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (flagging_wrap, 0.5, {
		opacity: 0,
		transform: "translateX(-10px)",
		ease: Power3.easeOut
	}, "-=1.4")

	/* arrow 24 blocklists voting */

	.to (arrow_24_sLength, 1.5, {
		opacity: 1,
		length: arrow_24_sLength.pathLength,
		onUpdate: drawArr24,
		ease: Power3.easeOut
	})

	.from (arrow_24, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (blocklists_voting, 0.5, {
		opacity: 0,
		transform: "translateX(10px)",
		ease: Power3.easeOut
	}, "-=1.5")

	/* arrow 25 blacklists */

	.to (arrow_25_sLength, 1.5, {
		opacity: 1,
		length: arrow_25_sLength.pathLength,
		onUpdate: drawArr25,
		ease: Power3.easeOut
	})

	.from (arrow_25, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (blacklists_wrap, 0.5, {
		opacity: 0,
		transform: "translateY(10px)",
		ease: Power3.easeOut
	}, "-=1.5")

	/* arrow 26 blocklists blockchain */

	.to (arrow_26_sLength, 1.5, {
		opacity: 1,
		length: arrow_26_sLength.pathLength,
		onUpdate: drawArr26,
		ease: Power3.easeOut
	})

	.from (arrow_26, 0.001, {
		opacity: 0
	}, "-=1.49")

	.from (blocklists_blockchain, 0.5, {
		opacity: 0,
		transform: "translateY(10px)",
		ease: Power3.easeOut
	}, "-=1.5")

	/* color cube */
	.to (color_cube, 1, {
		transform: "translateY(35px)",
		ease: Power3.easeOut
	})

	.from (color_cube_outline, 1, {
		opacity: 0,
		ease: Power3.easeOut
	}, "-=1")

	/**
	 * Communication Protocol Step 4 (cps-4) - Full protocol
	 */
	.add(function(){
		$('[id*="cps-"]').removeClass('active').find('input[type="checkbox"]').prop('checked', false);
		$('#cps-1, #cps-2, #cps-3, #cps-4').addClass('active').find('input[type="checkbox"]').prop('checked', true);
		fst1();
		fst2();
		fst3();
	}, "cps-4")

	.timeScale(1.5);

	communicationProtocol.restart();

	var bCommunicationProtocol = false;

	/**
	 * Start animation
	 */
	$(window).scroll(function(){
		if (!bCommunicationProtocol) {
			if ($('#_x32_4_x5F_tr_x5F_box').visible()) {
				bCommunicationProtocol = true;
				communicationProtocol.restart();
				return;
			}
		}
	});

	/**
	 * Change step after click
	 */
	$('[id*="cps-"]').on('click', function(){
		var cps = $(this).attr('id');
		if (cps == 'cps-1') {
			communicationProtocol.restart();
		} else {
			communicationProtocol.play(cps);
		}
	});

	/**
	 * Fixed stroke-dasharray
	 */
	function fst1() {
		var ids = [
			/* user */
			'#user_x5F_outer_1_',
			'#user_x5F_inner_1_',
			/* publisher */
			'#pub_x5F_outer_1_',
			'#pub_x5F_inner_1_',
			/* bidder */
			'#bidder_x5F_outer_1_',
			'#bidder_x5F_inner_1_',
			/* advertiser */
			'#adv_x5F_outer_1_',
			'#adv_x5F_inner_1_',
			/* arrows */
			'#arrow_x5F_1_x5F_content_x5F_request_2_',
			'#arrow_x5F_2_x5F_content_x5F_ad_x5F_placement_2_',
			'#arrow_x5F_3_x5F_ad_x5F_request',
			'#arrow_x5F_4_x5F_ad_x5F_address_2_',
			'#arrow_x5F_5_x5F_ssl_2_',
			'#arrow_x5F_6_x5F_encrypted_x5F_creatives_2_',
			'#arrow_x5F_7_x5F_decryption'
		];
		$(ids.join()).css('stroke-dasharray', 0);
	};

	function fst2() {
		var ids = [
			/* arrows */
			'#arrow_x5F_daily_x5F_sum_x5F_advertiser',
			'#arrow_x5F_daily_x5F_sum_x5F_publisher',
			'#arrow_x5F_rewards_x5F_initiation_2_',
			'#arrow_x5F_daily_x5F_advertising_x5F_spend',
			'#arrow_x5F_voting_x5F_rewards_1_',
			'#arrow_x5F_daily_x5F_publisher_x5F_payment_1_',
			'#arrow_x5F_individual_x5F_OCT_x5F_advertiser',
			'#arrow_x5F_individual_x5F_OCT_x5F_publisher'
		];
		$(ids.join()).css('stroke-dasharray', 0);
	};

	function fst3() {
		var ids = [
			/* arrows */
			'#arrow_x5F_off_x5F_chain_x5F_ver_x5F_advertiser',
			'#arrow_x5F_off_x5F_chain_x5F_ver_x5F_publisher',
			'#arrow_x5F_creative_x5F_hashes_2_',
			'#arrow_x5F_targeting_x5F_budget_2_',
			'#arrow_x5F_blacklists_x5F_whitelists_2_',
			'#arrow_x5F_appeals_x5F_deposits_x5F_advertiser',
			'#arrow_x5F_appeals_x5F_deposits_x5F_publisher',
			'#arrow_x5F_flagging_2_',
			'#arrow_x5F_blocklists_x5F_voting_2_',
			'#arrow_x5F_blacklists_2_',
			'#arrow_x5F_blocklists_x5F_blockchain_2_',
		];
		$(ids.join()).css('stroke-dasharray', 0);
	};
};

/**
 * Users
 */

window.animUsersInit = function(){
	var users = new TimelineMax({paused: false});

	var outer = $('#solution_users_outer_path_gs');
	var inner = $('#solution_users_inner_path_gs');
	var base = $('#solution_users_base_gs');
	var hexagons = $('#solution_users_hexagons');

	users.from (outer, 1, {
		opacity: 0,
		ease: Power3.easeOut,
		scale: 0, transformOrigin: "center"
	})

	.from (inner, 1, {
		opacity: 0,
		ease: Power3.easeOut,
		scale: 0, transformOrigin: "center"
	}, "-=0.875")

	.from (base, 1, {
		opacity: 0,
		scale: 0, transformOrigin: "center",
		ease: Elastic.easeOut.config(0.5, 0.4),
		rotation: 360
	}, "-=1")

	.from (hexagons, 1, {
		opacity: 0,
		scale: 1.2, transformOrigin: "center",
		ease: Power3.easeOut
	}, "-=0.5")

	.timeScale(1);

	$('#solution_users').mouseenter(function(){
		users.restart();
	});
};

/**
 * Publishers
 */

window.animPublishersInit = function(){
	var publishers = new TimelineMax({paused: false});

	var outer = $('#solution_publishers_outer_path_gs');
	var inner = $('#solution_publishers_inner_path_gs');
	var base = $('#solution_publisher_base_gs');
	var hexagons = $('#solution_publishers_hexagons');

	publishers.from (outer, 1, {
		opacity: 0,
		ease: Power3.easeOut,
		scale: 0, transformOrigin: "center"
	})

	.from (inner, 1, {
		opacity: 0,
		ease: Power3.easeOut,
		scale: 0, transformOrigin: "center"
	}, "-=0.875")

	.from (base, 1, {
		opacity: 0,
		scale: 0, transformOrigin: "center",
		ease: Elastic.easeOut.config(0.5, 0.4),
		rotation: 360
	}, "-=1")

	.from (hexagons, 1, {
		opacity: 0,
		scale: 1.2, transformOrigin: "center",
		ease: Power3.easeOut
	}, "-=0.5")

	.timeScale(1);

	$('#solution_publishers').mouseenter(function(){
		publishers.restart();
	});
};

/**
 * Advertisers
 */

window.animAdvertisersInit = function(){
	var advertisers = new TimelineMax ({paused: false});

	var outer = $('#solution_advertisers_outer_path_gs');
	var inner = $('#solution_advertisers_inner_path_gs');
	var base = $('#solution_advertiser_base_gs');
	var hexagons = $('#solution_advertiser_hexagons');

	advertisers.from (outer, 1, {
		opacity: 0,
		ease: Power3.easeOut,
		scale: 0, transformOrigin: "center"
	})

	.from (inner, 1, {
		opacity: 0,
		ease: Power3.easeOut,
		scale: 0, transformOrigin: "center"
	}, "-=0.875")

	.from (base, 1, {
		opacity: 0,
		scale: 0, transformOrigin: "center",
		ease: Elastic.easeOut.config(0.5, 0.4),
		rotation: 360
	}, "-=1")

	.from (hexagons, 1, {
		opacity: 0,
		scale: 1.2, transformOrigin: "center",
		ease: Power3.easeOut
	}, "-=0.5")

	.timeScale(1);

	$('#solution_advertisers').mouseenter(function(){
		advertisers.restart();
	});
}

/**
 * Ad tech providers
 */

window.animAdTechProvidersInit = function(){
	var adTechProviders = new TimelineMax({paused: false});

	var outer = $('#solution_ad_tech_providers_outer_path_gs');
	var inner = $('#solution_ad_tech_providers_inner_path_gs');
	var base = $('#solution_ad_tech_providers_base_gs');
	var hexagons = $('#solution_ad_tech_providers_hexagons');

	adTechProviders.from (outer, 1, {
		opacity: 0,
		ease: Power3.easeOut,
		scale: 0, transformOrigin: "center"
	})

	.from (inner, 1, {
		opacity: 0,
		ease: Power3.easeOut,
		scale: 0, transformOrigin: "center"
	}, "-=0.875")

	.from (base, 1, {
		opacity: 0,
		scale: 0, transformOrigin: "center",
		ease: Elastic.easeOut.config(0.5, 0.4),
		rotation: 360
	}, "-=1")

	.from (hexagons, 1, {
		opacity: 0,
		scale: 1.2, transformOrigin: "center",
		ease: Power3.easeOut
	}, "-=0.5")

	.timeScale(1);

	$('#ad_tech').mouseenter(function(){
		adTechProviders.restart();
	});
};

/**
 * Animations Solutions Init
 */

window.animSolutionsInit = function(){
	animUsersInit();
	animPublishersInit();
	animAdvertisersInit();
	animAdTechProvidersInit();
};